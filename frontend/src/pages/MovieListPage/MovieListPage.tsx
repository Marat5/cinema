import { PageHeading } from '../../components/PageHeading/PageHeading';
import { MOVIES } from '../../utils/constants';

export const MovieListPage = () => (
  <>
    <PageHeading title="Top Rated Movies" />

    <table>
      <tr>
        <th>Title</th>
        <th>Director</th>
        <th>Rating</th>
        <th>IMDB rating</th>
        <th>When watched</th>
      </tr>

      {MOVIES.map((movie) => (
        <tr>
          <td>{movie.title}</td>
          <td>{movie.director_name}</td>
          <td>{movie.rating}</td>
          <td>imdb todo</td>
          <td>when watched todo</td>
        </tr>
      ))}
    </table>
  </>

);
