import { create } from "zustand";

interface IUsersData {
  id: number;
  score: number;
  choiceId: number | null;
}

interface BoardState {
  users: IUsersData[];
  rounds: number;
  updateScore: (winnerId: number) => void;
  increaseRound: () => void;
}
export const useBoard = create<BoardState>((set) => ({
  users: [
    { id: 0, score: 0, choiceId: null },
    { id: 1, score: 0, choiceId: null },
  ],
  rounds: 0,
  updateScore: (winnerId: number) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === winnerId
          ? { ...user, score: user.score + 1 }
          : user
      ),
    })),
  increaseRound: () =>
    set((state: { rounds: number }) => ({ rounds: state.rounds + 1 })),
}));
