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
let note = await read('blog', 'api', 'json');
```

The returned note will follow the `Note` interface.

### As Markdown

```ts
let note = await read('blog', 'api', 'md');
```

The returned note will be a string with the Markdown content.

### As plain text

```ts
let note = await read('blog', 'api', 'txt');
```

The returned note will be a string with the note content as plain text, without Markdown.

## Read the Site Data and List of Notes

Use it to get a site data with their public notes.

```ts
let sitePath = 'blog';
let page = 1;
let visibility = 'public';
let siteData = await site(sitePath, page, visibility);
```

The return value will be an object with the format:

```ts
type SiteData = { site: Site; notes: Note[] };
```

## Private API

To use the private API, first, get your API token from https://collectednotes.com/accounts/me/token.

Now create a new client instance with:

```ts
let cn = collectedNotes('your@email.com', 'your-api-token');
```

### List of Sites

Get the list of sites of the logged-in user.

```ts
let sites = await cn.sites();
```

Each site of the list follows the `Site` interface.

### Latest Notes

You can now get the latest notes, public and private, of a site based on their ID.

```ts
let sitePath = 'blog';
let page = 1; // default is 1
let notes = await cn.latestNotes(sitePath, page);
```

Each note of the list follows the `Note` interface.

### Create a Note

You can use the client to create a new note for a site of the user:

```ts
let sitePath = 'blog'; // optional, if missing the API will use your first site
let noteContent = {
  body: '# Title\nContent of the note.',
  visiblity: 'private',
};
let note = await cn.create(noteContent, sitePath);
```

The returned note follows the `Note` interface.

> Note: This method will validate your body starts with `#` and throw a CNError instance if not.

### Update a Note

You can use the client to update an existant note:

```ts
let sitePath = 'blog';
let notePath = 'api';
let noteContent = {
  body: '# Title\nNew content of the note.',
  visiblity: 'private',
};
let note = await cn.update(sitePath, notePath, noteContent);
```

The returned note follows the `Note` interface.

> Note: This method will validate your body starts with `#` and throw a CNError instance if not.

### Delete a Note

You can use the client to delete a note:

```ts
let sitePath = 'blog';
let notePath = 'api';
await cn.destroy(sitePath, notePath);
```

The returned response is the same returned by the Fetch API, you can use `response.ok` or `response.statusCode` to check if the delete was successful.

### User Data

You can use the client to get the user data.

```ts
let user = await cn.me();
```

The returned user follows the `User` interface.

### Reorder notes

You can use the client to reorder your notes.

```ts
let sitePath = 'blog';
let notes: number[] = [2, 3, 1];
let orderedIds = await cn.reorder(sitePath, notes);
```

The returned orderedIds is an array of the ids in their new order, this will be the same as the notes argument.

### Search

You can use the client to search your notes.

```ts
let sitePath = 'blog';
let term = 'new content';
let page = 1; // default is 1
let visibility = 'public'; // default is not defined
let notes = await cn.search(sitePath, term, page, visibility);
```

### Body

Get the rendered body of a note. This method is useful when you don't want to get the markdown or when you want to use custom Markdown syntax supported by Collected Notes (e.g. to embed [YouTube videos](https://collectednotes.com/blog/support-for-youtube) or [Tweets](https://collectednotes.com/blog/support-for-tweets))

```ts
let sitePath = 'blog';
let notePath = 'api';
let { note, body } = await cn.body(sitePath, notePath);
```

### Links

Get the list of links that are contained in a note.

```ts
let sitePath = 'blog';
let notePath = 'api';
let format = 'json'; // or html, default is json
let links = await cn.links(sitePath, notePath, format);
```

### Site and Read

The private client also comes with the `read` and `site` methods used to get only public data. These methods are exactly the same ones and are being returned only for convenience so you could use them as:

```ts
let { site, notes } = await cn.site('blog');
let note = await cn.site('blog', 'api', 'json');
```

### Feed

You can generate a JSON feed for your Collected Notes site using the `feed` function.

```ts
let sitePath = 'blog';
let visibility = 'public_site';
let feedOptions = {
  home_page_url: 'https://example.com',
  feed_url: 'https://example.com/feed.json',
};
let format = 'json'; // default is JSON
// the result is a JSONFeed object as defined in the types below
let jsonFeed = await cn.site(sitePath, visibility, feedOptions, format);
```

You can generate an XML (aka RSS) feed for your Collected Notes site using the `feed` function.

```ts
let sitePath = 'blog';
let visibility = 'public_site';
let feedOptions = {
  home_page_url: 'https://example.com',
  feed_url: 'https://example.com/feed.json',
};
let format = 'xml'; // default is JSON
// the result is a string with the XML required to build a valid RSS feed
let xmlFeed = await cn.site(sitePath, visibility, feedOptions, format);
```

Note this function will run a call to get tha site information with the first page (only one page), the user information to get the author data and the HTML body of each note receives. In a site with 40 notes (max for one page) this will run 42 HTTP requests. Nevertheless, the first two are in parallel and the other dynamic amount are are run at the same time.

## Types

You can also import the interfaces of the values returned by the API or the webhooks.

```ts
import {
  ID,
  Markdown,
  HTML,
  XML,
  URL,
  Email,
  ISODate,
  NoteVisibility,
  NoteFormat,
  FeedFormat,
  JSONFeed,
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
- `HTML` — alias of string
- `XML` — alias of string
- `URL` — alias of string
- `Email` — alias of string
- `ISODate` — alias of string
- `NoteVisibility` — "private" or "public" or "public_unlisted" or "public_site"
- `NoteFormat` — "md" or "txt" or "json"
- `FeedFormat` — "xml" or "json"
- `JSONFeed` — The type of a JSON feed
- `Note` — The type of a note
- `Site` — The type of a site
- `User` — The type of a user
- `Link` — The type of a link inside a note
- `EventNoteUpdated` — The type of the note updated event
- `EventNoteCreated` — The type of the note created event
- `EventNoteDeleted` — The type of the note deleted event
- `EventNotesReordered` — The type of the notes reordered event
- `Event` — union of other Webhook-types
