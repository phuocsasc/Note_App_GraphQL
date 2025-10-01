export default {
    authors: [
        {
            id: 123,
            name: 'Phuoc',
        },
        {
            id: 999,
            name: 'Nam',
        },
    ],
    folders: [
        {
            id: '1',
            name: 'Home',
            createdAt: '2025-10-18T03:42:132Z',
            authorId: 123,
        },
        {
            id: '2',
            name: 'New Folder',
            createdAt: '2025-11-18T03:42:132Z',
            authorId: 999,
        },
        {
            id: '3',
            name: 'Word',
            createdAt: '2025-09-18T03:42:132Z',
            authorId: 123,
        },
    ],
    notes: [
        {
            id: '123',
            content: '<p>Go to park</p>',
            folderId: '1',
        },
        {
            id: '234',
            content: '<p>Go to supperMarket</p>',
            folderId: '1',
        },
        {
            id: '456',
            content: '<p>Go to school</p>',
            folderId: '2',
        },
    ],
};
