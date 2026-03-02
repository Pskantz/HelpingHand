import { useState, useEffect, useRef } from 'react';
import { type TeamMember } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Plus, Trash2, Upload, X, LogOut, User, Edit2 } from 'lucide-react';

const colorOptions = [
  { name: 'Rosa', value: 'bg-pink-500' },
  { name: 'Lila', value: 'bg-purple-500' },
  { name: 'Blå', value: 'bg-blue-500' },
  { name: 'Grön', value: 'bg-green-500' },
  { name: 'Orange', value: 'bg-orange-500' },
  { name: 'Röd', value: 'bg-red-500' },
  { name: 'Gul', value: 'bg-yellow-500' },
  { name: 'Teal', value: 'bg-teal-500' },
  { name: 'Indigo', value: 'bg-indigo-500' },
  { name: 'Cyan', value: 'bg-cyan-500' },
];

export function AdminPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [newMember, setNewMember] = useState<TeamMember>({
    name: '',
    role: '',
    initials: '',
    color: 'bg-pink-500',
    bio: '',
  });

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load team members when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadTeamMembers();
    }
  }, [isAuthenticated]);

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      // Load from Supabase
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setTeamMembers(data as TeamMember[]);
      } else {
        setTeamMembers([]);
      }
    } catch (error: any) {
      console.error('Load team members error:', error);
      toast.error('Kunde inte ladda medarbetare från Supabase');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Hämta lösenord från Supabase-tabell 'admin_settings'
    const { data, error } = await supabase
      .from('admin_settings')
      .select('admin_password')
      .single();
    if (error) {
      toast.error('Kunde inte hämta admin-lösenord');
      return;
    }
    if (data && password === data.admin_password) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
      toast.success('Välkommen till admin!');
    } else {
      toast.error('Fel lösenord');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
    toast.success('Du har loggat ut');
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMember.name || !newMember.role) {
      toast.error('Namn och roll är obligatoriska');
      return;
    }

    // Generate initials from name if not provided
    const initials = newMember.initials || newMember.name.charAt(0).toUpperCase();
    
    const member: TeamMember = {
      ...newMember,
      initials,
    };

    try {
      if (editingId) {
        // Update existing member
        const { error } = await supabase
          .from('team_members')
          .update(member)
          .eq('id', editingId);

        if (error) throw error;

        const updated = teamMembers.map(m => m.id === editingId ? { ...member, id: editingId } : m);
        setTeamMembers(updated);
        toast.success('Medarbetare uppdaterad!');
        setEditingId(null);
      } else {
        // Add new member
        const { data, error } = await supabase
          .from('team_members')
          .insert([member])
          .select();

        if (error) throw error;

        if (data && data.length > 0) {
          setTeamMembers([...teamMembers, data[0] as TeamMember]);
        }
        toast.success('Medarbetare tillagd!');
      }

      setNewMember({
        name: '',
        role: '',
        initials: '',
        color: 'bg-pink-500',
        bio: '',
      });
      setShowAddForm(false);
    } catch (error: any) {
      console.error('Add/Update member error:', error);
      toast.error('Kunde inte spara medarbetare: ' + error.message);
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setNewMember(member);
    setEditingId(member.id!);
    setShowAddForm(true);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewMember({
      name: '',
      role: '',
      initials: '',
      color: 'bg-pink-500',
      bio: '',
    });
    setShowAddForm(false);
  };

  const handleDeleteMember = async (id: string) => {
    if (confirm('Är du säker på att du vill ta bort denna medarbetare?')) {
      try {
        const { error } = await supabase
          .from('team_members')
          .delete()
          .eq('id', id);

        if (error) {
          throw error;
        }

        const updated = teamMembers.filter(m => m.id !== id);
        setTeamMembers(updated);
        toast.success('Medarbetare borttagen');
      } catch (error: any) {
        console.error('Delete member error:', error);
        toast.error('Kunde inte ta bort medarbetare: ' + error.message);
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      // Use Supabase Storage if available
      const filePath = `team/${Date.now()}_${file.name}`;
      const { data, error: uploadError } = await supabase.storage
        .from('team-photos')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        // If bucket doesn't exist or upload fails, fallback to base64
        console.warn('Supabase upload failed:', uploadError.message);
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewMember({ ...newMember, image_url: reader.result as string });
          setUploadingImage(false);
          toast.success('Bild uppladdad (lokalt fallback)');
        };
        reader.readAsDataURL(file);
        return;
      }

      // Get public URL
      const { data: publicData } = supabase.storage.from('team-photos').getPublicUrl(filePath);
      const publicUrl = publicData?.publicUrl || '';

      let finalUrl = publicUrl;
      if (publicUrl) {
        try {
          const resp = await fetch(publicUrl, { method: 'HEAD' });
          if (!resp.ok) {
            // Try create signed url as a fallback
            const expiresIn = 60 * 60 * 24 * 7; // 7 days
            const { data: signedData, error: signedError } = await supabase.storage
              .from('team-photos')
              .createSignedUrl(filePath, expiresIn);
            if (!signedError && signedData?.signedUrl) {
              finalUrl = signedData.signedUrl;
            } else {
              console.warn('Could not fetch public url and createSignedUrl failed', signedError);
            }
          }
        } catch (err) {
          console.warn('Error checking public url:', err);
        }
      }

      setNewMember({ ...newMember, image_url: finalUrl });
      setUploadingImage(false);
      toast.success('Bild uppladdad!');
    } catch (error) {
      console.error(error);
      toast.error('Kunde inte ladda upp bild');
      setUploadingImage(false);
    }
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-teal flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-heading text-2xl font-bold text-gray-900">
              HelpingHand Admin
            </h1>
            <p className="text-gray-600 mt-2">
              Logga in för att hantera medarbetare
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Lösenord</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ange lösenord"
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full bg-teal hover:bg-teal-dark">
              Logga in
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-heading text-xl font-bold text-gray-900">
                HelpingHand Admin
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logga ut
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl font-bold text-gray-900">
            Medarbetare
          </h2>
          <Button 
            onClick={() => {
              if (showAddForm && editingId) {
                handleCancelEdit();
              } else {
                setShowAddForm(!showAddForm);
              }
            }}
            className="bg-teal hover:bg-teal-dark gap-2"
          >
            <Plus className="w-4 h-4" />
            {showAddForm ? 'Stäng formulär' : 'Lägg till medarbetare'}
          </Button>
        </div>

        {/* Add/Edit Member Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8 border-l-4 border-teal">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-lg font-bold text-gray-900">
                {editingId ? 'Redigera medarbetare' : 'Ny medarbetare'}
              </h3>
              {editingId && (
                <span className="text-sm text-teal font-medium bg-teal/10 px-3 py-1 rounded-full">
                  Redigeringsläge
                </span>
              )}
            </div>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Namn *</Label>
                  <Input
                    id="name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    placeholder="T.ex. Anna"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Roll *</Label>
                  <Input
                    id="role"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    placeholder="T.ex. Barnvakt"
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="initials">Initialer (valfritt)</Label>
                  <Input
                    id="initials"
                    value={newMember.initials}
                    onChange={(e) => setNewMember({ ...newMember, initials: e.target.value })}
                    placeholder="T.ex. A"
                    maxLength={2}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Lämnas tom för första bokstaven i namnet
                  </p>
                </div>
                <div>
                  <Label>Färg</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setNewMember({ ...newMember, color: color.value })}
                        className={`w-8 h-8 rounded-full ${color.value} ${
                          newMember.color === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Beskrivning (valfritt)</Label>
                <textarea
                  id="bio"
                  value={newMember.bio || ''}
                  onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                  placeholder="Kort beskrivning om medarbetaren..."
                  rows={3}
                  className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-teal focus:ring-1 focus:ring-teal resize-none"
                />
              </div>

              <div>
                <Label>Bild (valfritt)</Label>
                <div className="mt-1 flex items-center gap-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {uploadingImage ? 'Laddar upp...' : (newMember.image_url ? 'Byt bild' : 'Välj bild')}
                  </Button>
                  {newMember.image_url && (
                    <div className="relative">
                      <img 
                        src={newMember.image_url} 
                        alt="Preview" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setNewMember({ ...newMember, image_url: undefined })}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="bg-teal hover:bg-teal-dark gap-2">
                  {editingId ? (
                    <>
                      <Edit2 className="w-4 h-4" />
                      Uppdatera medarbetare
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Spara medarbetare
                    </>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Avbryt
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Team Members List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Laddar medarbetare...</p>
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-card p-12 text-center">
            <p className="text-gray-600">Inga medarbetare ännu. Klicka på "Lägg till medarbetare" för att börja.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl shadow-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  {member.image_url ? (
                    <img 
                      src={member.image_url} 
                      alt={member.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full ${member.color} flex items-center justify-center`}>
                      <span className="text-white text-2xl font-heading font-bold">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{member.role}</p>
                    {member.bio && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                        {member.bio}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                      title="Redigera"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id!)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      title="Ta bort"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Instructions */}
        <div className="mt-12 bg-blue-50 rounded-2xl p-6">
          <h3 className="font-heading text-lg font-bold text-blue-900 mb-3">
            Så här fungerar det
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li>• Lägg till nya medarbetare med knappen ovan</li>
            <li>• Klicka på <Edit2 className="w-4 h-4 inline mx-1" /> för att redigera en medarbetare</li>
            <li>• Klicka på <Trash2 className="w-4 h-4 inline mx-1" /> för att ta bort</li>
            <li>• Ladda upp bilder direkt från din dator</li>
            <li>• Välj olika färger för varje medarbetare</li>
            <li>• All information sparas i realtid i Supabase</li>
          </ul>
        </div>
      </main>
    </div>
  );
}