import { collectedNotes, read, site, Note, Site, User } from '../src';

const fakeNote: Note = {
  id: 1,
  site_id: 1,
  user_id: 1,
  body: '# My title\nThis is a **test** note',
  path: 'suerte',
  headline: 'This is a test note',
  title: 'Suerte',
  created_at: new Date().toJSON(),
  updated_at: new Date().toJSON(),
  visibility: 'public',
  url: 'https://collectednotes.com/famoso/my-title',
  curated: false,
  poster: null,
  ordering: 1,
};

const fakeSite: Site = {
  id: 1,
  user_id: 1,
  name: 'Alejandro Crosa',
  headline: 'This is a test Collected Notes site',
  about: "It's all about testing",
  host: '',
  created_at: new Date().toJSON(),
  updated_at: new Date().toJSON(),
  site_path: 'esacrosa',
  published: true,
  tinyletter: '',
  domain: '',
  webhook_url: '',
  payment_platform: null,
  is_premium: true,
};

const fakeUser: User = {
  id: 1,
  email: 'your@email.com',
  name: 'Alejandro Crosa',
  role: 'premium',
  banned: false,
  avatar_key: '1/avatar',
  created_at: '2020-05-19T23:39:05.496Z',
  updated_at: '2020-06-05T09:23:27.062Z',
};

describe(site, () => {
  test('should get site data', () => {
    fetchMock.once(JSON.stringify({ site: fakeSite, notes: [fakeNote] }));
    expect(site('esacrosa')).resolves.toEqual({
      site: fakeSite,
      notes: [fakeNote],
    });
  });
});

describe(read, () => {
  test('should get data as JSON by default', () => {
    fetchMock.once(JSON.stringify(fakeNote));
    expect(read('esacrosa', 'suerte')).resolves.toEqual(fakeNote);
  });

  test('should get data as JSON', () => {
    fetchMock.once(JSON.stringify(fakeNote));
    expect(read('esacrosa', 'suerte', 'json')).resolves.toEqual(fakeNote);
  });

  test('Should get data as markdown', () => {
    fetchMock.once('# My title\nThis is a **test** note');
    expect(read('esacrosa', 'suerte', 'md')).resolves.toBe(
      '# My title\nThis is a **test** note'
    );
  });

  test('should get data as plain text', () => {
    fetchMock.once('My title\n========\n\nThis is a test note');
    expect(read('esacrosa', 'suerte', 'md')).resolves.toBe(
      'My title\n========\n\nThis is a test note'
    );
  });
});

describe(collectedNotes, () => {
  let cn: ReturnType<typeof collectedNotes>;
  beforeEach(() => {
    cn = collectedNotes('your@email.com', 'secret-token');
    jest.restoreAllMocks();
    fetchMock.resetMocks();
  });

  test('should get last notes', () => {
    fetchMock.once(JSON.stringify([fakeNote]));
    expect(cn.latestNotes(1)).resolves.toEqual([fakeNote]);
  });

  test('should get user sites', () => {
    fetchMock.once(JSON.stringify([fakeSite]));
    expect(site('esacrosa')).resolves.toEqual([fakeSite]);
  });

  test('should create a note', () => {
    fetchMock.once(JSON.stringify(fakeNote));
    expect(
      cn.create(1, {
        body: '# My title\nThis is a **test** note',
        visibility: 'public',
      })
    ).resolves.toEqual(fakeNote);
  });

  test('should update a note', () => {
    fetchMock.once(JSON.stringify(fakeNote));
    expect(
      cn.update(1, 1, {
        body: '# My title\nThis is a **test** note',
        visibility: 'public',
      })
    ).resolves.toEqual(fakeNote);
  });

  test('should destroy a note', () => {
    fetchMock.once('');
    expect(cn.destroy(1, 1)).resolves.toBeTruthy();
  });

  test('should get the user data', () => {
    fetchMock.once(JSON.stringify(fakeUser));
    expect(cn.me()).resolves.toEqual(fakeUser);
  });

  test('should reorder notes', () => {
    fetchMock.once(JSON.stringify([2, 3, 1]));
    expect(cn.reorder(1, [2, 3, 1])).resolves.toEqual([2, 3, 1]);
  });
});
