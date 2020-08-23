# Collected Notes TS Client

> A TypeScript client for the Collected Notes API.

- TypeScript Support
- Types for the API returned value
- Types for webhook events
- Public and private API support
- JSDoc with full documentation
- Zero-dependencies

## Getting Started

Install it

```sh
$ yarn add collected-notes
```

Import it

```ts
import { read, site, collectedNotes } from 'collected-notes';
```

## Read a Public Note

Use it to read a single note:

### As JSON

```ts
const note = await read('sergiodxa', 'using-collected-notes-as-cms', 'json');
```

The returned note will follow the `Note` interface.

### As Markdown

```ts
const note = await read('sergiodxa', 'using-collected-notes-as-cms', 'md');
```

The returned note will be a string with the Markdown content.

### As plain text

```ts
const note = await read('sergiodxa', 'using-collected-notes-as-cms', 'txt');
```

The returned note will be a string with the note content as plain text, without Markdown.

## Read the Site Data and List of Notes

Use it to get a site data with their public notes.

```ts
const sitePath = 'sergiodxa';
const page = 1;
const visibility = "public";
const siteData = await site(sitePath, page, visibility);
```

The return value will be an object with the format:

```ts
type SiteData = { site: Site; notes: Note[] };
```

## Private API

To use the private API, first, get your API token from https://collectednotes.com/accounts/me/token.

Now create a new client instance with:

```ts
const cn = collectedNotes('your@email.com', 'your-api-token');
```

### List of Sites

Get the list of sites of the logged-in user.

```ts
const sites = await cn.sites();
```

Each site of the list follows the `Site` interface.

### Latest Notes

You can now get the latest notes, public and private, of a site based on their ID.

```ts
const siteId = 1;
const page = 1; // default is 1
const notes = await cn.latestNotes(siteId, page);
```

Each note of the list follows the `Note` interface.

### Create a Note

You can use the client to create a new note for a site of the user:

```ts
const siteId = 1; // optional, if missing the API will use your first site
const noteContent = {
  body: '# Title\nContent of the note.',
  visiblity: 'private',
};
const note = await cn.create(noteContent, siteId);
```

The returned note follows the `Note` interface.

> Note: This method will validate your body starts with `#` and throw a CNError instance if not.

### Update a Note

You can use the client to update an existant note:

```ts
const siteId = 1;
const noteId = 2;
const noteContent = {
  body: '# Title\nNew content of the note.',
  visiblity: 'private',
};
const note = await cn.update(siteId, noteId, noteContent);
```

The returned note follows the `Note` interface.

> Note: This method will validate your body starts with `#` and throw a CNError instance if not.

### Delete a Note

You can use the client to delete a note:

```ts
const siteId = 1;
const noteId = 2;
await cn.destroy(siteId, noteId);
```

The returned response is the same returned by the Fetch API, you can use `response.ok` or `response.statusCode` to check if the delete was successful.

### User Data

You can use the client to get the user data.

```ts
const user = await cn.me();
```

The returned user follows the `User` interface.

### Reorder notes

You can use the client to reorder your notes.

```ts
const siteId = 1;
const notes: number[] = [2, 3, 1];
const orderedIds = await cn.reorder(siteId, notes);
```

The returned orderedIds is an array of the ids in their new order, this will be the same as the notes argument.

### Search

You can use the client to search your notes.

```ts
const sitePath = "blog";
const term = 'new content';
const page = 1; // default is 1
const visibility = "public"; // default is not defined
const notes = await cn.search(sitePath, term, page, visibility);
```

### Body

Get the rendered body of a note. This method is useful when you don't want to get the markdown or when you want to use custom Markdown syntax supported by Collected Notes (e.g. to embed [YouTube videos](https://collectednotes.com/blog/support-for-youtube) or [Tweets](https://collectednotes.com/blog/support-for-tweets))

```ts
const siteId = 1;
const noteId = 2;
const { note, body } = await cn.body(siteId, noteId);
```

### Links

Get the list of links that are contained in a note.

```ts
const siteId = 1;
const noteId = 2;
const format = "json"; // or html, defualt is json
const links = await cn.links(siteId, noteId, format);
```

### Site and Read

The private client also comes with the `read` and `site` methods used to get only public data. These methods are exactly the same ones and are being returned only for convenience so you could use them as:

```ts
const { site, notes } = await cn.site('sergiodxa');
const note = await cn.site('sergiodxa', 'using-collected-notes-as-cms', 'json');
```

## Types

You can also import the interfaces of the values returned by the API or the webhooks.

```ts
import {
  ID,
  Markdown,
  URL,
  Email,
  ISODate,
  NoteVisibility,
  NoteFormat,
  Note,
  Site,
  User,
  Link,
  EventNoteUpdated,
  EventNoteCreated,
  EventNoteDeleted,
  EventNotesReordered,
  EventNotesReordered,
  Event,
} from 'collected-notes';
```

You can then use them to type any function in case TS is not capable to get the type implicitely, below you can see the definitions:

- `ID` — alias of number
- `Markdown` — alias of string
- `URL` — alias of string
- `Email` — alias of string
- `ISODate` — alias of string
- `NoteVisibility` — union of strings
- `NoteFormat` — union of strings
- `Note` — The type of a note
- `Site` — The type of a site
- `User` — The type of a user
- `Link` — The type of a link inside a note
- `EventNoteUpdated` — The type of the note updated event
- `EventNoteCreated` — The type of the note created event
- `EventNoteDeleted` — The type of the note deleted event
- `EventNotesReordered` — The type of the notes reordered event
- `Event` — union of other Webhook-types
