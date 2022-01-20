import { PageHeader } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../Router';

interface HeaderProps {
    
}
 
const HeaderCustom: React.FC<HeaderProps> = () => {

    const navigate = useNavigate()

    return ( <>
    <div className=' top-0 shadow w-full bg-white'>
     <PageHeader
    title="Bazar UTM"
    onBack={() => {
        navigate(ROUTES.root)
      }}
    />
    </div>    
    </> );
}
 
export default HeaderCustom;