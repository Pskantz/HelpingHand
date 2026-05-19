import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/ScrollReveal';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category?: string[];
  initials: string;
  color: string;
  image_url?: string;
  bio?: string;
}

interface TeamCategory {
  title: string;
  slug: string;
  description: string;
}

const categories: TeamCategory[] = [
  { title: 'Barnvakt', slug: 'barnvakt', description: 'Barnpassning och barnomsorg med trygg, erfaren personal.' },
  { title: 'Bartender', slug: 'bartender', description: 'Professionella bartendrar för fest, event och privata tillställningar.' },
  { title: 'Servitris/servitör', slug: 'servitris-servitor', description: 'Servispersonal som hjälper till med servering, dukning och service.' },
  { title: 'Eventpersonal', slug: 'eventpersonal', description: 'Allt från eventplanering till stöd för möten och fester.' },
  { title: 'Hundvakt/kattvakt', slug: 'hundvakt-kattvakt', description: 'Trygg djurpassning hemma hos dig när du är borta.' },
  { title: 'Hantverkare', slug: 'hantverkare', description: 'Praktiska händer för små och stora hantverksjobb i hemmet.' },
  { title: 'Hemstädning', slug: 'hemstadning', description: 'Noggrann städning av hemmet efter dina önskemål.' },
  { title: 'Bröllop', slug: 'brollop', description: 'Servicepersonal och planering för att göra bröllopet perfekt.' },
];

const defaultMembers: TeamMember[] = [
  { id: '1', name: 'Silvia', role: 'Barnvakt & Lärare', category: ['barnvakt'], initials: 'S', color: 'bg-pink-500' },
  { id: '2', name: 'Kimberly', role: 'Barnskötare', category: ['barnvakt'], initials: 'K', color: 'bg-purple-500' },
  { id: '3', name: 'Matilda', role: 'Barnvakt & Sjuksköterska', category: ['barnvakt'], initials: 'M', color: 'bg-blue-500' },
  { id: '4', name: 'Jessica', role: 'Barnvakt & Förskollärare', category: ['barnvakt'], initials: 'J', color: 'bg-green-500' },
  { id: '5', name: 'Tess', role: 'Barnvakt & Lärarassistent', category: ['barnvakt'], initials: 'T', color: 'bg-orange-500' },
];

function normalizeCategoryValue(value: string): string {
  const normalized = value.trim().toLowerCase();
  const matchedCategory = categories.find(
    (item) => item.slug === normalized || item.title.toLowerCase() === normalized
  );
  return matchedCategory?.slug ?? normalized;
}

function normalizeCategoryValues(category?: string[] | string): string[] {
  if (!category) return [];

  if (Array.isArray(category)) {
    return category
      .filter(Boolean)
      .map((value) => normalizeCategoryValue(value))
      .filter(Boolean);
  }

  const stringValue = category.trim();
  if (!stringValue) return [];

  if (stringValue.startsWith('[') || stringValue.startsWith('{')) {
    try {
      const parsed = JSON.parse(stringValue.replace(/\{/g, '[').replace(/\}/g, ']'));
      if (Array.isArray(parsed)) {
        return parsed
          .flatMap((value) => (typeof value === 'string' ? value.split(',') : []))
          .map((value) => normalizeCategoryValue(value))
          .filter(Boolean);
      }
    } catch {
      // fall back to comma split
    }
  }

  return stringValue
    .split(',')
    .map((value) => normalizeCategoryValue(value))
    .filter(Boolean);
}

export function TeamSection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { category: categoryParam } = useParams<{ category?: string }>();

  // Helper function to parse categories from path
  const parseCategoriesFromPath = (category?: string) => {
    return category
      ? category
          .split(',')
          .map((slug) => slug.trim())
          .filter((slug) => categories.some((item) => item.slug === slug))
      : [];
  };

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultMembers);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const membersGridRef = useRef<HTMLDivElement>(null);
  const categoryFiltersRef = useRef<HTMLDivElement>(null);

  // Calculate selectedCategories directly from URL parameter (single source of truth)
  const selectedCategories = parseCategoriesFromPath(categoryParam);

  const updateCategoryPath = (nextCategories: string[]) => {
    const path = nextCategories.length > 0
      ? `/personal/${nextCategories.join(',')}`
      : '/personal';

    navigate(path);
  };

  const filteredMembers = location.pathname.startsWith('/personal') && selectedCategories.length > 0
    ? teamMembers.filter((member) => {
        const memberCategorySlugs = normalizeCategoryValues(member.category);
        const hasMatch = selectedCategories.some((slug) => memberCategorySlugs.includes(slug.toLowerCase()));
        return hasMatch;
      })
    : teamMembers;

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

  // Handle opening a member by ID from query params
  useEffect(() => {
    if (location.pathname.startsWith('/personal') && teamMembers.length > 0) {
      const params = new URLSearchParams(location.search);
      const id = params.get('id');
      if (id) {
        const found = teamMembers.find((m) => m.id === id);
        if (found) {
          setSelectedMember(found);
        }
      } else {
        setSelectedMember(null);
      }
    }
  }, [location.search, teamMembers]);

  return (
    <section id="personal" className="py-20 lg:py-28 bg-gradient-to-br from-orange-50 via-white to-pink-50">
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
            {location.pathname.startsWith('/personal') && (
              <div className="mb-8" ref={categoryFiltersRef}>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
                  {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.slug);
                    return (
                      <button
                        key={category.slug}
                        type="button"
                        onClick={() => {
                          const nextCategories = isSelected
                            ? selectedCategories.filter((slug) => slug !== category.slug)
                            : [...selectedCategories, category.slug];

                          updateCategoryPath(nextCategories);

                          // Show toast notification and scroll to members
                          if (!isSelected) {
                            toast.success(`Här är våra ${category.title}`, {
                              description: category.description,
                            });
                            // Scroll to members grid after a small delay
                            setTimeout(() => {
                              membersGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }, 100);
                          }
                        }}
                        className={`rounded-3xl border p-6 text-left shadow-sm transition-all duration-300 text-gray-800 ${isSelected ? 'border-teal bg-gradient-to-br from-teal-50 to-teal-100 shadow-lg transform scale-105' : 'border-gray-200 bg-white hover:shadow-lg hover:border-orange-200 hover:bg-gradient-to-br hover:from-orange-50 hover:to-pink-50'}`}
                      >
                        <h3 className="font-heading text-xl font-bold mb-2">{category.title}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                      </button>
                    );
                  })}
                </div>

                {selectedCategories.length > 0 && (
                  <div className="flex flex-col gap-4 items-center justify-between rounded-3xl border border-teal/20 bg-teal/5 p-4 sm:flex-row">
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      <span className="text-sm font-medium text-teal">Valda kategorier:</span>
                      {selectedCategories.map((slug) => {
                        const category = categories.find((item) => item.slug === slug);
                        return (
                          <span key={slug} className="rounded-full border border-teal/40 bg-gradient-to-r from-white to-orange-50 px-3 py-1 text-sm text-gray-700 shadow-sm">
                            {category?.title ?? slug}
                          </span>
                        );
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMember(null);
                        updateCategoryPath([]);
                        // Scroll to category filters
                        setTimeout(() => {
                          categoryFiltersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                      }}
                      className="rounded-full border border-teal bg-white px-4 py-2 text-sm font-semibold text-teal hover:bg-teal hover:text-white transition-all"
                    >
                      Rensa filter
                    </button>
                  </div>
                )}
              </div>
            )}

            {selectedCategories.length > 0 && filteredMembers.length === 0 && (
              <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 text-center text-gray-700 mb-8">
                <p className="font-medium">Inga medarbetare hittades för de valda kategorierna.</p>
                <p className="mt-2 text-sm text-gray-500">Kontrollera att medarbetare har kategorier kopplade i adminpanelen.</p>
              </div>
            )}

            <div ref={membersGridRef}>
              <StaggerContainer 
                key={`members-${selectedCategories.join(',')}`}
                className={
                  location.pathname.startsWith('/personal')
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12'
                    : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-12'
                }
                staggerDelay={0.1}
              >
              {filteredMembers.map((member, index) => {
                const openProfile = (m: TeamMember) => {
                  if (!location.pathname.startsWith('/personal')) {
                    navigate(`/personal?id=${m.id}`);
                  } else {
                    setSelectedMember(m);
                  }
                };

                return (
                  <StaggerItem key={member.id || index}>
                    {location.pathname.startsWith('/personal') ? (
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
                                className="font-heading text-xl font-bold text-gray-900 cursor-pointer hover:text-teal-600 transition-colors duration-200 hover:underline decoration-teal-600 decoration-2 underline-offset-2"
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
            </div>

            {/* Profile modal shown when on /personal and selectedMember set */}
            {location.pathname.startsWith('/personal') && selectedMember && (
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
                  setSelectedMember(null);
                  updateCategoryPath([]);
                  // Scroll to category filters
                  setTimeout(() => {
                    categoryFiltersRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="border-2 border-teal text-teal hover:bg-teal hover:text-white px-8 py-6 text-base font-semibold rounded-xl group transition-all"
              >
                Visa alla kategorier
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </ScrollReveal>
          </>
        )}
      </div>
    </section>
  );
}
