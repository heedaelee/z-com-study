interface UserID {
  id: string;
}

export interface User {
  id: string;
  nickname: string;
  image: string;
  Followers: UserID[]; // 팔로워 목록
  _count: {
    Followers: number;
    Followings: number;
  };
}
