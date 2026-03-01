import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init('AGQakIU8erV0lq75x');

export function JobApplicationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [cover, setCover] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !position) {
      toast.error('Fyll i namn, email och vilken tjänst du söker');
      return;
    }

    setSending(true);

    try {
      const result = await emailjs.send('service_deql5wj', 'template_96jxkv9', {
        to_email: 'info@helpinghandsverige.se',
        from_name: name,
        from_email: email,
        phone: phone,
        message: `Position: ${position}\n\nPersonligt brev:\n${cover}`,
      });

      if (result.status === 200) {
        toast.success('Ansökan skickad — vi kontaktar dig snart');
        setName('');
        setEmail('');
        setPhone('');
        setPosition('');
        setCover('');
        setFile(null);
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      toast.error('Kunde inte skicka ansökan. Försök igen senare.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-8 max-w-3xl mx-auto">
      <h2 className="font-heading text-3xl font-bold mb-2 text-gray-900">Skicka in din ansökan</h2>
      <p className="text-gray-600 mb-8">Fyll i formuläret nedan och vi kontaktar dig snart!</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Namn *</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Din namn"
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="din@email.com"
              className="mt-1" 
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input 
              id="phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="+46 123 456 789"
              className="mt-1" 
            />
          </div>
          <div>
            <Label htmlFor="position">Position du söker *</Label>
            <Input 
              id="position" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              placeholder="t.ex. Barnvakt"
              className="mt-1" 
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cover">Personligt brev</Label>
          <textarea 
            id="cover" 
            rows={6} 
            value={cover} 
            onChange={(e) => setCover(e.target.value)} 
            placeholder="Berätta om dig själv och varför du vill jobba hos oss..."
            className="w-full mt-1 px-3 py-2 border border-gray-200 rounded-lg focus:border-teal focus:ring-1 focus:ring-teal resize-none" 
          />
        </div>

        <div>
          <Label>CV (valfritt)</Label>
          <input 
            type="file" 
            accept=".pdf,.doc,.docx" 
            onChange={(e) => setFile(e.target.files?.[0] || null)} 
            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal file:text-white hover:file:bg-teal-dark" 
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="submit" 
            className="bg-teal hover:bg-teal-dark px-8 py-3" 
            disabled={sending}
          >
            {sending ? 'Skickar...' : 'Skicka ansökan'}
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              setName('');
              setEmail('');
              setPhone('');
              setPosition('');
              setCover('');
              setFile(null);
            }}
          >
            Rensa
          </Button>
        </div>
      </form>
    </div>
  );
}
