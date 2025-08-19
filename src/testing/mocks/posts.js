const mockPosts = [
  {
    id: 1,
    title: "This is my first post",
    text: "This is the body of my post",
    preview: "This is preview of body",
    created_at: new Date(2025, 4, 16).toISOString(),
    edited_at: new Date(2025, 4, 16).toISOString(),
    slug: "this-is-my-first-post",
    is_published: false,
  },
  {
    id: 2,
    title: "Art of testing",
    text: "Testing is mandatory, nuff said",
    preview: "Concise is nice",
    created_at: new Date(2023, 8, 21).toISOString(),
    edited_at: new Date(2024, 0, 10).toISOString(),
    slug: "art-of-testing",
    is_published: true,
  },
];

export default mockPosts;
