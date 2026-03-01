import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import { supabase } from '@/lib/supabase';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: string;
  image_url?: string;
  bio?: string;
}

const defaultMembers: TeamMember[] = [
  { id: '1', name: 'Silvia', role: 'Barnvakt & Lärare', initials: 'S', color: 'bg-pink-500' },
  { id: '2', name: 'Kimberly', role: 'Barnskötare', initials: 'K', color: 'bg-purple-500' },
  { id: '3', name: 'Matilda', role: 'Barnvakt & Sjuksköterska', initials: 'M', color: 'bg-blue-500' },
  { id: '4', name: 'Jessica', role: 'Barnvakt & Förskollärare', initials: 'J', color: 'bg-green-500' },
  { id: '5', name: 'Tess', role: 'Barnvakt & Lärarassistent', initials: 'T', color: 'bg-orange-500' },
];

export function TeamSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultMembers);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const loadTeamMembers = async () => {
      try {
        // Load team members from Supabase
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Load error:', error);
          return;
        }

        if (data && data.length > 0) {
          setTeamMembers(data as TeamMember[]);
        } else {
          // no data, clear existing defaults
          setTeamMembers([]);
        }
      } catch (err) {
        console.error('Error loading team members:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTeamMembers();
  }, []);

  // If the URL contains ?id=..., open that profile when on /personal
  useEffect(() => {
    if (location.pathname === '/personal') {
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      if (id && teamMembers.length > 0) {
        const found = teamMembers.find((m) => m.id === id);
        if (found) setSelectedMember(found);
      }
    }
  }, [location.search, location.pathname, teamMembers]);

  return (
    <section id="personal" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12 lg:mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Vår personal
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Våra medarbetare är noggrant utvalda och utbildade för att ge dig den bästa servicen.
          </p>
        </ScrollReveal>

        {loading ? (
          <p className="text-center text-gray-600 py-12">Laddar medarbetare...</p>
        ) : teamMembers.length === 0 ? (
          <p className="text-center text-gray-600 py-12">Inga medarbetare ännu.</p>
        ) : (
          <>
            <StaggerContainer 
              className={
                location.pathname === '/personal'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12'
                  : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12'
              }
              staggerDelay={0.1}
            >
              {teamMembers.map((member, index) => {
                const openProfile = (m: TeamMember) => {
                  if (location.pathname !== '/personal') {
                    navigate(`/personal?id=${m.id}`);
                  } else {
                    setSelectedMember(m);
                  }
                };

                return (
                  <StaggerItem key={member.id || index}>
                    {location.pathname === '/personal' ? (
                      <div className="bg-white rounded-2xl shadow-card p-6 flex items-start gap-4">
                        {member.image_url ? (
                          <img src={member.image_url} alt={member.name} className="w-24 h-24 rounded-full object-cover" />
                        ) : (
                          <div className={`w-24 h-24 rounded-full ${member.color} flex items-center justify-center`}>
                            <span className="text-white text-3xl font-heading font-bold">{member.initials}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3
                                role="button"
                                tabIndex={0}
                                onClick={() => openProfile(member)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    openProfile(member);
                                  }
                                }}
                                className="font-heading text-xl font-bold text-gray-900 cursor-pointer hover:underline"
                              >
                                {member.name}
                              </h3>
                              <p className="text-gray-600 mt-1">{member.role}</p>
                            </div>
                          </div>
                          {member.bio && (
                            <p className="text-gray-700 mt-3 leading-relaxed line-clamp-3">{member.bio}</p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div
                          className="relative inline-block mb-4 group"
                          role="button"
                          tabIndex={0}
                          onClick={() => openProfile(member)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              openProfile(member);
                            }
                          }}
                        >
                          {member.image_url ? (
                            <img
                              src={member.image_url}
                              alt={member.name}
                              className="w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full object-cover group-hover:scale-105 transition-transform shadow-lg cursor-pointer"
                            />
                          ) : (
                            <div className={`w-24 h-24 lg:w-28 lg:h-28 mx-auto rounded-full ${member.color} flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg cursor-pointer`}>
                              <span className="text-white text-3xl lg:text-4xl font-heading font-bold">
                                {member.initials}
                              </span>
                            </div>
                          )}

                          {member.bio && (
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-64 sm:w-72 md:w-80 bg-white border border-gray-200 rounded-lg p-3 text-sm text-gray-700 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                              <p className="text-sm leading-relaxed">{member.bio}</p>
                            </div>
                          )}
                        </div>

                        <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-gray-600 text-sm">{member.role}</p>

                        {member.bio && (
                          <p className={`text-gray-500 text-sm mt-2 line-clamp-2`}>{member.bio}</p>
                        )}
                      </div>
                    )}
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Profile modal shown when on /personal and selectedMember set */}
            {location.pathname === '/personal' && selectedMember && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="bg-white rounded-2xl max-w-3xl w-full mx-4 p-6 shadow-xl">
                  <div className="flex items-start gap-4">
                    {selectedMember.image_url ? (
                      <img src={selectedMember.image_url} alt={selectedMember.name} className="w-28 h-28 rounded-full object-cover" />
                    ) : (
                      <div className={`w-28 h-28 rounded-full ${selectedMember.color} flex items-center justify-center`}>
                        <span className="text-white text-3xl font-heading font-bold">{selectedMember.initials}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading text-2xl font-bold text-gray-900">{selectedMember.name}</h3>
                          <p className="text-gray-600 mt-1">{selectedMember.role}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setSelectedMember(null);
                              // remove ?id from URL
                              navigate('/personal', { replace: true });
                            }}
                            className="text-gray-500 hover:text-gray-700 p-1"
                          >
                            <X className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                      {selectedMember.bio && (
                        <p className="text-gray-700 mt-4 leading-relaxed">{selectedMember.bio}</p>
                      )}
                      <button
                        className="mt-6 w-full bg-teal text-white py-3 rounded-xl font-semibold hover:bg-teal-dark transition-all"
                        onClick={() => {
                          navigate(`/kontakt?medarbetare=${encodeURIComponent(selectedMember.name)}`);
                        }}
                      >
                        Boka {selectedMember.name}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <ScrollReveal delay={0.3} className="text-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  if (location.pathname !== '/personal') {
                    navigate('/personal');
                  }
                }}
                className="border-2 border-teal text-teal hover:bg-teal hover:text-white px-8 py-6 text-base font-semibold rounded-xl group transition-all"
              >
                Se alla våra medarbetare
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
}
