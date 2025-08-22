const mockComments = [
  {
    id: 0,
    text: "I'm commentin and criticizin",
    created_at: new Date(2017, 10, 24).toISOString(),
    edited_at: new Date(2017, 10, 24).toISOString(),
    user: {
      username: "John Toe",
    },
  },
  {
    id: 1,
    text: "Wow, life changing!",
    created_at: new Date(2020, 5, 14).toISOString(),
    edited_at: new Date(2021, 11, 1).toISOString(),
    user: {
      username: "MrMark",
    },
  },
  {
    id: 2,
    text: "What a delightful post, I will cherish it the rest of my life",
    created_at: new Date(2017, 1, 14).toISOString(),
    edited_at: new Date(2017, 1, 14).toISOString(),
    user: {
      username: "sally",
    },
  },
];

export default mockComments;
