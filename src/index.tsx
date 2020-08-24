/**
 * An unique identifier of an item inside the Collected Notes API.
 * @export
 */
export type ID = number;

/**
 * A string containing Markdown, with optional FrontMatter at the beginning.
 * @export
 */
export type Markdown = string;

/**
 * A string containing HTML
 * @export
 */
export type HTML = string;

/**
 * A valid URL string.
 * @export
 */
export type URL = string;

/**
 * A valid email address string.
 * @export
 */
export type Email = string;

/**
 * An ISO-8601 date as a string.
 * @export
 */
export type ISODate = string;

/**
 * The posible visibility of a note.
 *
 * A `private` note is only visible for the author when it's logged-in inside
 * Collected Noted
 *
 * A `public` note is visible to everyone and appears on your Collected Noted
 * site.
 *
 * A `public_unlisted` note is not listed on your Collected Noted site but it
 * can be accessed by anyone with the link.
 *
 * A `site_public` is only visible through the API when a custom domain is set.
 * This notes will not appear on your Collected Noted site.
 * This visibility
 * option is only available when your site has a custom domain.
 * @export
 */
export type NoteVisibility =
  | 'private'
  | 'public'
  | 'public_unlisted'
  | 'public_site';

/**
 * The format a note can come in.
 * @export
 */
export type NoteFormat = 'md' | 'txt' | 'json';

/**
 * A note inside Collected Notes.
 *
 * A note is what other platforms call an article or post.
 *
 * It has an author (`user_id`) and belongs to a site (`site_id`) and a `body`
 * with the content of the note.
 * @export
 */
export type Note = {
  /**
   * The ID of the note itself.
   * @type {ID}
   */
  id: ID;
  /**
   * The ID of the site the note belongs to.
   * @type {ID}
   */
  site_id: ID;
  /**
   * The ID of the user who wrote the note.
   * @type {ID}
   */
  user_id: ID;
  /**
   * The body of the note, with the content in Markdown.
   * @type {string}
   */
  body: Markdown;
  /**
   * The path of the note (e.g. `api`)
   * @type {string}
   */
  path: string;
  /**
   * The headline of the note, extracted from the first characters of the body.
   *
   * @type {string}
   */
  headline: string;
  /**
   * The title of the note, extracted from the first line of the body when prepended with `#`.
   * @type {string}
   */
  title: string;
  /**
   * The creation date of the note.
   * @type {ISODate} - The date in ISO-8601
   */
  created_at: ISODate;
  /**
   * The date of the last update of the note.
   * @type {ISODate} - The date in ISO-8601
   */
  updated_at: ISODate;
  /**
   * The visibility of the note, it could be `private`, `public`, or `public_unlisted`, or `public_site`.
   * @type {NoteVisibility}
   */
  visibility: NoteVisibility;
  /**
   * The full URL of the note, using the Collected Notes domain.
   * @type {string}
   */
  url: URL;
  /**
   * The first image used inside the note.
   * @type {(string | null)}
   */
  poster: string | null;
  /**
   * If the Note was curated by the [@CuratedNotes](https://twitter.com/CuratedNotes) Twitter account.
   * @type {boolean}
   */
  curated: boolean;
  /**
   * The order of the note.
   * @type {number}
   */
  ordering: number;
};

/**
 * A site inside Collected Notes.
 *
 * Sites belong to users, but a user can have more than one site.
 *
 * A site is where all notes written by a user are grouped.
 * @export
 */
export type Site = {
  /**
   *The ID of the site itself.
   * @type {ID}
   */
  id: ID;
  /**
   * The ID of the user who owns the site
   * @type {ID}
   */
  user_id: ID;
  /**
   * The name of the site.
   * @type {string}
   */
  name: string;
  /**
   * The headline (description) of the site.
   * @type {string}
   */
  headline: string;
  about: string;
  host: string | null;
  /**
   * The creation date of the site.
   * @type {ISODate} - The date in ISO-8601
   */
  created_at: ISODate;
  /**
   * The date of the last update of the site.
   * @type {ISODate} - The date in ISO-8601
   */
  updated_at: ISODate;
  /**
   * The path of the site (e.g. `blog`)
   * @type {string}
   */
  site_path: string;
  /**
   * If the site is published or not
   * @type {boolean}
   */
  published: boolean;
  /**
   * The TinyLetter username used for the integration.
   * @type {string}
   */
  tinyletter: string;
  /**
   * The custom domain the site runs on.
   *
   * @type {string}
   */
  domain: string;
  /**
   * The webhook URL configured to receive events from Collected Notes.
   * @type {string}
   */
  webhook_url: URL;
  /**
   * The payment platform used.
   * @type {(string | null)}
   */
  payment_platform: string | null;
  /**
   * If the site is on a premium plan.
   * @type {boolean}
   */
  is_premium: boolean;
  /**
   * The total number of **public** notes on the site.
   * @type {number}
   */
  total_notes: number;
};

export type User = {
  /**
   * The ID of the user itself.
   * @type {ID}
   */
  id: ID;
  /**
   * The email address of the user.
   * @type {string}
   */
  email: Email;
  /**
   * The name of the user.
   * @type {string}
   */
  name: string;
  /**
   * The role of the user inside the platform.
   * @type {string}
   */
  role: string;
  /**
   * If the user is banned.
   * @type {boolean}
   */
  banned: boolean;
  /**
   * The avatar URL of the user.
   *
   * @type {string}
   */
  avatar_key: URL;
  /**
   * The creation date of the user.
   * @type {ISODate} - The date in ISO-8601
   */
  created_at: ISODate;
  /**
   * The date of the last update of the user.
   * @type {ISODate} - The date in ISO-8601
   */
  updated_at: ISODate;
};

export type EventNoteUpdated = {
  event: 'note-updated';
  data: { note: Note };
};
export type EventNoteCreated = {
  event: 'note-created';
  data: { note: Note };
};
export type EventNoteDeleted = {
  event: 'note-deleted';
  data: { note: Note };
};
export type EventNotesReordered = {
  event: 'note-reordered';
  data: { notes: Note[] };
};

export type Event =
  | EventNoteUpdated
  | EventNoteCreated
  | EventNoteDeleted
  | EventNotesReordered;

/**
 * A link detected by Collected Notes in the body of a note.
 *
 * They are differentiated based on the domain if they are internal or external.
 *
 * A link is marked as internal when the domain is Collected Notes and as an
 * external link when the domain is outside Collected Notes.
 */
export type Link = {
  /**
   * The unique identified of the link.
   * @type {ID}
   */
  id: ID;
  /**
   * The ID of the note the link belongs to.
   * @type {ID}
   */
  note_id: ID;
  /**
   * The full URL of the link.
   * @type {URL}
   */
  url: URL;
  /**
   * The kind of link.
   * A link is marked as internal when the domain is Collected Notes and as an
   * external link when the domain is outside Collected Notes.
   * @type {('internal' | 'external')}
   */
  kind: 'internal' | 'external';
  /**
   * The host (domain) of the link, this is used in the Collected Notes website
   * to highlight it from the rest of the URL.
   *
   * @type {string}
   */
  host: string;
  /**
   * The title of the note, in Markdown the title is defined as:
   *   `[text with link](url "title")`
   * Note how the linked text is not the same as the title.
   * This will be an empty string if the title is not defined.
   * @type {string}
   */
  title: string;
  /**
   * The creation date of the link.
   * @type {ISODate} - The date in ISO-8601
   */
  created_at: ISODate;
  /**
   * The date of the last update of the link.
   * @type {ISODate} - The date in ISO-8601
   */
  updated_at: ISODate;
};

/**
 * Create a new client of the API to consume the private endpoints.
 *
 * This can only be used when you have a Premium account.
 * Subscribe to Collected Notes on https://collectednotes.com/accounts/me/subscription.
 *
 * @export
 * @function
 * @param {Email} email - The string you use to login in Collected Notes
 * @param {string} token - Your API token, you can get it in https://collectednotes.com/accounts/me/token
 * @returns
 */
export function collectedNotes(email: Email, token: string) {
  const headers = {
    Authorization: `${email} ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  /**
   * Get the latest notes of a Collected Notes site.
   *
   * The notes returned by this method includes the private and unlisted notes.
   * To get only the public notes you can use the `site` method.
   * _This API is paginated._
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g. `blog`)
   * @param {number} [page=1] - The page of the results, by default is `1`
   * @param {NoteVisibility} [visibility] - The page of the results, by default is `1`
   * @returns {Promise<Note[]>} - The list of notes
   */
  async function latestNotes(
    sitePath: string,
    page: number = 1,
    visibility?: NoteVisibility
  ): Promise<Note[]> {
    const url = visibility
      ? `https://collectednotes.com/sites/${sitePath}/notes?page=${page}&visibility=${visibility}`
      : `https://collectednotes.com/sites/${sitePath}/notes?page=${page}`;

    const response = await fetch(url, { headers });
    return await response.json();
  }

  /**
   * Get the list of sites of the user.
   *
   * @function
   * @async
   * @returns {Promise<Site[]>} - The list of sites
   */
  async function sites(): Promise<Site[]> {
    const response = await fetch('https://collectednotes.com/sites', {
      headers,
    });
    return await response.json();
  }

  /**
   * Create a new note with the given body and visibility.
   *
   * @function
   * @async
   * @param {{ body: string; visibility: NoteVisibility }} note - The body and visibility of the new note
   * @param {string} [sitePath] - The path of the site (e.g. `blog`), if not specified the note will be automatically added to the first site you have configured
   * @returns {Promise<Note>} - The newly created note
   */
  async function create(
    note: { body: string; visibility: NoteVisibility },
    sitePath?: string
  ): Promise<Note> {
    const { body, visibility } = note;
    const url = sitePath
      ? `https://collectednotes.com/sites/${sitePath}/notes`
      : 'https://collectednotes.com/notes/add';

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ note: { body, visibility } }),
    });
    return await response.json();
  }

  /**
   * Update the body and visibility of a note.
   * Always pass the body and visibility, even if you are changing only one of
   * them.
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g.`blog`)
   * @param {string} notePath - The path of the note (e.g. `api`)
   * @param {{ body: string; visibility: NoteVisibility }} note - The new body and visibility of the note
   * @returns {Promise<Note>} - The updated note data
   */
  async function update(
    sitePath: string,
    notePath: string,
    note: { body: string; visibility: NoteVisibility }
  ): Promise<Note> {
    const { body, visibility } = note;
    const response = await fetch(
      `https://collectednotes.com/sites/${sitePath}/notes/${notePath}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ note: { body, visibility } }),
      }
    );
    return await response.json();
  }

  /**
   * Delete a note, permanently.
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g. `blog`)
   * @param {string} notePath - The path of the note (e.g. `api`)
   * @returns {Promise<void>} - This method returns nothing
   */
  async function destroy(sitePath: string, notePath: string): Promise<void> {
    await fetch(
      `https://collectednotes.com/sites/${sitePath}/notes/${notePath}`,
      {
        headers,
        method: 'DELETE',
      }
    );
  }

  /**
   * Get the info of the currently logged-in user, based on the credentials.
   *
   * @function
   * @async
   * @returns {Promise<User>} - The user information
   */
  async function me(): Promise<User> {
    const response = await fetch('https://collectednotes.com/accounts/me', {
      headers,
    });
    return await response.json();
  }

  /**
   * Reorder the notes of the site.
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g. `blog`)
   * @param {ID[]} noteIdList - The sorted ids of the notes
   * @returns {Promise<number[]>} - The final sorted ids as stored in Collected Notes
   */
  async function reorder(
    sitePath: string,
    noteIdList: ID[]
  ): Promise<number[]> {
    const response = await fetch(
      `https://collectednotes.com/sites/${sitePath}/notes/reorder`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({ ids: noteIdList }),
      }
    );
    return await response.json();
  }

  /**
   * Search notes for a website. When using the `visibility` option it will only
   * search within your notes with the specified visibility, when it's not
   * defined it will search within all your notes.
   * _This API is paginated._
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g. `blog`)
   * @param {string} term - The search term, it will be encoded as a valid URI
   * @param {number} [page=1] - The page of the results, by default is `1`
   * @param {NoteVisibility} [visibility] - The visibility of the notes your are trying to search for
   * @returns {Promise<Note[]>} - The list of notes matching the search term
   */
  async function search(
    sitePath: string,
    term: string,
    page: number = 1,
    visibility?: NoteVisibility
  ): Promise<Note[]> {
    const encodedTerm = encodeURI(term);
    const url = visibility
      ? `https://collectednotes.com/sites/${sitePath}/notes/search?term=${encodedTerm}&page=${page}&visibility=${visibility}`
      : `https://collectednotes.com/sites/${sitePath}/notes/search?term=${encodedTerm}&page=${page}`;

    const response = await fetch(url, { method: 'GET', headers });
    return await response.json();
  }

  /**
   * Get a note with the body rendered as HTML.
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g. `blog`)
   * @param {string} notePath - The path of the note (e.g. `api`)
   * @returns {Promise<{ note:Note, body:HTML }>} - The note together with the HTML already parsed
   */
  async function body(
    sitePath: string,
    notePath: string
  ): Promise<{ note: Note; body: HTML }> {
    const response = await fetch(
      `https://collectednotes.com/sites/${sitePath}/notes/${notePath}/body`,
      { method: 'GET', headers }
    );
    return await response.json();
  }

  /**
   * Get the list of links that are contained in a note.
   *
   * @function
   * @async
   * @param {string} sitePath - The path of the site (e.g. `blog`)
   * @param {string} notePath - The path of the note (e.g. `api`)
   * @param {('json' | 'html')} [format='json'] - The format you want to get the notes
   * @returns {Promise<Link[] | HTML>}
   */
  async function links(
    sitePath: string,
    notePath: string,
    format?: 'json'
  ): Promise<Link[]>;
  async function links(
    sitePath: string,
    notePath: string,
    format: 'html'
  ): Promise<HTML>;
  async function links(
    sitePath: string,
    notePath: string,
    format: 'json' | 'html' = 'json'
  ): Promise<Link[] | HTML> {
    const response = await fetch(
      `https://collectednotes.com/sites/${sitePath}/notes/${notePath}/links${
        format === 'json' ? '.json' : ''
      }`,
      { method: 'GET', headers }
    );
    return await response.json();
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
    search,
    body,
    links,
  } as const;
}

/**
 * Get the data of a site and their public notes.
 * This method is public and doesn't require authentication.
 * _This API is paginated._
 *
 * @export
 * @function
 * @async
 * @param {string} sitePath - The path of the site (e.g. `blog`)
 * @param {number} [page=1] - The page of the results, by default is `1`
 * @param {("public" | "public_site")} [visibility="public"] - The visibility of the notes you are trying to fetch.
 * @returns {Promise<{ site: Site; notes: Note[] }>} - An object with the site and the list of notes
 */
export async function site(
  sitePath: string,
  page: number = 1,
  visibility: Extract<NoteVisibility, 'public' | 'public_site'> = 'public'
): Promise<{ site: Site; notes: Note[] }> {
  const response = await fetch(
    `https://collectednotes.com/${sitePath}.json?page=${page}&visibility=${visibility}`
  );
  return await response.json();
}

/**
 * Get a note based using the site and note path.
 * This method is public and doesn't require authentication.
 *
 * This method allow you to get a note as plain text, plain Markdown or JSON.
 *
 * @export
 * @function
 * @async
 * @param {string} sitePath - The path of the site (e.g. `blog`)
 * @param {string} notePath - The path of the note (e.g. `api`)
 * @param {'json' | 'md' | 'txt'} [format="json"] - The format you expected the note
 * @returns {Promise<Note | string | Markdown>} - The note, in the format specified in the params
 */
export async function read(
  sitePath: string,
  notePath: string,
  format?: 'json'
): Promise<Note>;
export async function read(
  sitePath: string,
  notePath: string,
  format: 'md'
): Promise<Markdown>;
export async function read(
  sitePath: string,
  notePath: string,
  format: 'txt'
): Promise<string>;
export async function read(
  sitePath: string,
  notePath: string,
  format: NoteFormat = 'json'
): Promise<Note | string | Markdown> {
  switch (format) {
    case 'json': {
      const response = await fetch(
        `https://collectednotes.com/${sitePath}/${notePath}.json`
      );
      return await response.json();
    }
    case 'md': {
      const response = await fetch(
        `https://collectednotes.com/${sitePath}/${notePath}.md`
      );
      return await response.text();
    }
    case 'txt': {
      const response = await fetch(
        `https://collectednotes.com/${sitePath}/${notePath}.text`
      );
      return await response.text();
    }
  }
}
