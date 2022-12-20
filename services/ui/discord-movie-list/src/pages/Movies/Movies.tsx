import { useStore } from '../../store';

const Movies = () => {
  const [state] = useStore();

  return (
    <div>
      {state.user()!.username}#{state.user()!.usernameId}
    </div>
  );
};

export default Movies;
