export interface Note {
  id: number;
  site_id: number;
  user_id: number;
  body: string;
  path: string;
  headline: string;
  title: string;
  created_at: string;
  updated_at: string;
  visibility: string;
  url: string;
  poster: string | null;
  curated: boolean;
  ordering: number;
}

export interface Site {
  id: number;
  user_id: number;
  name: string;
  headline: string;
  about: string;
  host: any;
  created_at: string;
  updated_at: string;
  site_path: string;
  published: boolean;
  tinyletter: string;
  domain: string;
  payment_platform: string | null;
  is_premium: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  banned: boolean;
  avatar_key: string;
  created_at: string;
  updated_at: string;
}

export interface CollectedNotesClient {
  latestNotes(site: number): Promise<Note[]>;
  sites(): Promise<Site[]>;
  create(
    site: number,
    noteContent: {
      body: string;
      visibility: 'private' | 'public';
    }
  ): Promise<Note>;
  update(
    site: number,
    note: number,
    noteContent: {
      body: string;
      visibility: 'private' | 'public';
    }
  ): Promise<Note>;
  destroy(site: number, note: number): Promise<Response>;
  me(): Promise<User>;
  reorder(site: number, notes: number[]): Promise<number[]>;
  site(path: string): Promise<{ site: Site; notes: Note[] }>;
  read(
    site: string,
    note: string,
    format?: 'json' | 'md' | 'txt'
  ): Promise<Note | string>;
}

export class CNError extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, CNError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CNError);
    }
  }
}

export function collectedNotes(
  email: string,
  token: string
): CollectedNotesClient {
  const headers = {
    Authorization: `${email} ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  function validateBody(body: string) {
    if (!body.startsWith('# '))
      throw new CNError(
        'The body must start with `# ` to correctly detect the title and generate the slug.'
      );
    return;
  }

  async function latestNotes(site: number): Promise<Note[]> {
    const response = await fetch(
      `https://collectednotes.com/sites/${site}/notes`,
      { headers }
    );
    return response.json();
  }

  async function sites(): Promise<Site[]> {
    const response = await fetch('https://collectednotes.com/sites', {
      headers,
    });
    return response.json();
  }

  async function create(
    site: number,
    {
      body,
      visibility = 'private',
    }: {
      body: string;
      visibility: 'private' | 'public';
    }
  ): Promise<Note> {
    validateBody(body);
    const response = await fetch(
      `https://collectednotes.com/sites/${site}/notes`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ note: { body, visibility } }),
      }
    );
    return response.json();
  }

  async function update(
    site: number,
    note: number,
    {
      body,
      visibility = 'private',
    }: {
      body: string;
      visibility: 'private' | 'public';
    }
  ): Promise<Note> {
    validateBody(body);
    const response = await fetch(
      `https://collectednotes.com/sites/${site}/notes/${note}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ note: { body, visibility } }),
      }
    );
    return response.json();
  }

  async function destroy(site: number, note: number): Promise<Response> {
    const response = await fetch(
      `https://collectednotes.com/sites/${site}/notes/${note}`,
      { headers, method: 'DELETE' }
    );
    return response;
  }

  async function me(): Promise<User> {
    const response = await fetch('https://collectednotes.com/accounts/me', {
      headers,
    });
    return response.json();
  }

  async function reorder(site: number, notes: number[]): Promise<number[]> {
    const response = await fetch(
      `https://collectednotes.com/sites/${site}/notes/reorder`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ ids: notes }),
      }
    );
    return response.json();
  }

  return {
    latestNotes,
    sites,
    site,
    create,
    read,
    update,
    destroy,
    me,
    reorder,
  };
}

export async function site(
  path: string
): Promise<{ site: Site; notes: Note[] }> {
  const response = await fetch(`https://collectednotes.com/${path}`);
  return response.json();
}

export async function read(
  site: string,
  note: string,
  format?: 'json'
): Promise<Note>;
export async function read(
  site: string,
  note: string,
  format?: 'md'
): Promise<string>;
export async function read(
  site: string,
  note: string,
  format?: 'txt'
): Promise<string>;
export async function read(
  site: string,
  note: string,
  format: 'json' | 'md' | 'txt' = 'json'
): Promise<Note | string> {
  switch (format) {
    case 'json': {
      const response = await fetch(
        `https://collectednotes.com/${site}/${note}.json`
      );
      return response.json();
    }
    case 'md': {
      const response = await fetch(
        `https://collectednotes.com/${site}/${note}.md`
      );
      return response.text();
    }
    case 'txt': {
      const response = await fetch(
        `https://collectednotes.com/${site}/${note}.text`
      );
      return response.text();
    }
  }
}
