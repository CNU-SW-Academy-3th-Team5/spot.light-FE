import { Link } from 'react-router-dom';

export function LocationImage(props) {
    const { savedPath, pageData } = props;
    const width = 88 / 3;
    const height = 88 / 3;

    const imageLink = `/image/${savedPath}`;

    return (
        <Link to={{
            pathname: imageLink,
            state: { pageData: pageData }
        }}>
            <label>user</label>
            <img src={imageLink} alt="alt" style={{ margin: '2vw', border: 0, padding: 0, width: `${width}vw`, height: `${height}vw` }} />
        </Link>
    );
}
