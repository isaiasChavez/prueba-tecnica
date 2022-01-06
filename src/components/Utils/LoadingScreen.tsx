import { Spin } from "antd";

interface LoadingProps {
 
}
 
const LoadingScreen: React.FC<LoadingProps> = () => {
 return ( <div className="fixed inset-0  flex justify-center align-center">
    <Spin  size="large"></Spin>
 </div> );
}
 
export default LoadingScreen;