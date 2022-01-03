import { PageHeader } from 'antd';

interface HeaderProps {
    
}
 
const HeaderCustom: React.FC<HeaderProps> = () => {
    return ( <>
    <div className=' top-0 shadow w-full bg-white'>
     <PageHeader
    title="Bazar UTM"
    backIcon={null}
    />
    </div>    
    </> );
}
 
export default HeaderCustom;