import GifLoader from 'react-gif-loader';
import { useSelector } from 'react-redux'

const Loader = () => {
    const loading = useSelector(state => state.loader.loading);
    return (
        <div>
        <GifLoader
                loading={loading}
                imageSrc="http://localhost:3000/unnamed.gif"
                overlayBackground="white"
        />
        </div>
    )
}

export default Loader;