import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { EditorPageProps, EditorState } from './types';
import {
  createEducationEntry,
  createLinkEntry,
  createProfessionalEntry,
  getSnapshot,
  reindexEntries,
} from './utils';

export const useEditorPage = (props: EditorPageProps) => {
  const router = useRouter();
  const [savedForm, setSavedForm] = useState<EditorState>({
    personalInformation: props.personalInformation,
    professional: props.professional,
    education: props.education,
    skills: props.skills,
    hobbies: props.hobbies,
    links: props.links,
    primaryColor: props.primaryColor,
  });
  const [form, setForm] = useState<EditorState>(savedForm);
  const [status, setStatus] = useState<string>('idle');
  const [message, setMessage] = useState<string>('');

  const hasChanges = useMemo(() => getSnapshot(form) !== getSnapshot(savedForm), [form, savedForm]);

  useEffect(() => {
    if (!hasChanges) {
      return;
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };

    const handleRouteChangeStart = (url: string) => {
      if (!hasChanges) {
        return;
      }

      const shouldLeave = window.confirm(
        'You have unsaved changes. Leave this page without saving?',
      );

      if (!shouldLeave) {
        router.events.emit('routeChangeError', url, 'Route change aborted');
        throw new Error('Route change aborted');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [hasChanges, router]);

  const previewName = useMemo(() => {
    const { givenName, familyName } = form.personalInformation.attributes;
    return `${givenName} ${familyName}`.trim();
  }, [form.personalInformation.attributes]);

  const updatePersonal = (
    field: keyof typeof form.personalInformation.attributes,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      personalInformation: {
        ...current.personalInformation,
        attributes: {
          ...current.personalInformation.attributes,
          [field]: value,
        },
      },
    }));
  };

  const updateSectionField = (
    section: 'professional' | 'education' | 'skills',
    index: number,
    field: string,
    value: string,
  ) => {
    setForm((current) => {
      const next = current[section].map((item, itemIndex) => {
        if (itemIndex !== index) return item;

        return {
          ...item,
          attributes: {
            ...item.attributes,
            [field]: value,
          },
        };
      });

      return {
        ...current,
        [section]: next,
      };
    });
  };

  const updateSectionBody = (
    section: 'professional' | 'education' | 'skills',
    index: number,
    value: string,
  ) => {
    setForm((current) => {
      const next = current[section].map((item, itemIndex) => {
        if (itemIndex !== index) return item;
        return {
          ...item,
          body: value,
        };
      });

      return {
        ...current,
        [section]: next,
      };
    });
  };

  const moveProfessionalEntry = (index: number, direction: -1 | 1) => {
    setForm((current) => {
      const nextItems = [...current.professional];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= nextItems.length) {
        return current;
      }

      const [item] = nextItems.splice(index, 1);
      nextItems.splice(targetIndex, 0, item);

      return {
        ...current,
        professional: reindexEntries(nextItems),
      };
    });
  };

  const moveEducationEntry = (index: number, direction: -1 | 1) => {
    setForm((current) => {
      const nextItems = [...current.education];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= nextItems.length) {
        return current;
      }

      const [item] = nextItems.splice(index, 1);
      nextItems.splice(targetIndex, 0, item);

      return {
        ...current,
        education: reindexEntries(nextItems),
      };
    });
  };

  const moveLinkEntry = (index: number, direction: -1 | 1) => {
    setForm((current) => {
      const nextItems = [...current.links];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= nextItems.length) {
        return current;
      }

      const [item] = nextItems.splice(index, 1);
      nextItems.splice(targetIndex, 0, item);

      return {
        ...current,
        links: nextItems,
      };
    });
  };

  const deleteProfessionalEntry = (index: number) => {
    setForm((current) => ({
      ...current,
      professional: reindexEntries(
        current.professional.filter((_, itemIndex) => itemIndex !== index),
      ),
    }));
  };

  const deleteEducationEntry = (index: number) => {
    setForm((current) => ({
      ...current,
      education: reindexEntries(
        current.education.filter((_, itemIndex) => itemIndex !== index),
      ),
    }));
  };

  const deleteLinkEntry = (index: number) => {
    setForm((current) => ({
      ...current,
      links: current.links.filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const addProfessionalEntry = () => {
    setForm((current) => ({
      ...current,
      professional: [...current.professional, createProfessionalEntry()],
    }));
  };

  const addEducationEntry = () => {
    setForm((current) => ({
      ...current,
      education: [...current.education, createEducationEntry()],
    }));
  };

  const addLinkEntry = () => {
    setForm((current) => ({
      ...current,
      links: [...current.links, createLinkEntry()],
    }));
  };

  const updateLink = (index: number, field: keyof EditorState['links'][number], value: string) => {
    setForm((current) => ({
      ...current,
      links: current.links.map((link, linkIndex) => {
        if (linkIndex !== index) return link;
        return {
          ...link,
          [field]: value,
        };
      }),
    }));
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!hasChanges) {
      setStatus('idle');
      setMessage('No changes to save yet.');
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/editor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to save changes.');
      }

      setSavedForm(form);
      setStatus('success');
      setMessage('Saved successfully. Refresh the résumé page to see the latest values.');
    } catch (error) {
      const fallback = error instanceof Error ? error.message : 'Save failed.';
      setStatus('error');
      setMessage(fallback);
    }
  };

  const updateHobbies = (value: string) => {
    setForm((current) => ({
      ...current,
      hobbies: {
        ...current.hobbies,
        body: value,
      },
    }));
  };

  const setPrimaryColor = (value: string) => {
    setForm((current) => ({
      ...current,
      primaryColor: value,
    }));
  };

  return {
    form,
    status,
    message,
    hasChanges,
    previewName,
    updatePersonal,
    updateSectionField,
    updateSectionBody,
    moveProfessionalEntry,
    moveEducationEntry,
    moveLinkEntry,
    deleteProfessionalEntry,
    deleteEducationEntry,
    deleteLinkEntry,
    addProfessionalEntry,
    addEducationEntry,
    addLinkEntry,
    updateLink,
    updateHobbies,
    setPrimaryColor,
    handleSave,
  } as const;
};
