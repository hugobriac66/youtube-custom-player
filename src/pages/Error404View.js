import { Link } from 'react-router-dom';
import { IoHome } from 'react-icons/io5';
import Button from '../components/Button';

const Error404View = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-3xl mb-8">404 Not Found</p>
      <Link to="/"><Button secondary className="text-xl px-6 py-5"><IoHome className="mr-2" />Back</Button></Link>
    </div>
  );
};

export default Error404View;
