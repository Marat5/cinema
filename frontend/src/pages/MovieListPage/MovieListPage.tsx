import { PageHeading } from '../../components/PageHeading/PageHeading';
import { MOVIES } from '../../utils/constants';
import './MovieListPage.css';

export const MovieListPage = () => (
  <>
    <PageHeading title="Top Rated Movies" />

    <table className="MoviesTable">
      <tr>
        <th>Title</th>
        <th>Director</th>
        <th>Rating</th>
        <th className="MoviesTable__col_hide-mobile">IMDB rating</th>
        <th className="MoviesTable__col_hide-mobile">When watched</th>
      </tr>

      {MOVIES.map((movie) => (
        <tr>
          <td>{movie.title}</td>
          <td>{movie.director_name}</td>
          <td>{movie.rating}</td>
          <td className="MoviesTable__col_hide-mobile">imdb todo</td>
          <td className="MoviesTable__col_hide-mobile">when watched todo</td>
        </tr>
      ))}
    </table>
  </>

);
