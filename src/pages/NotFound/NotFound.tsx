import { Button, Flex, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function () {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate('/personCenter/1')
  }

  return (
    <Flex align='center' justify='center' style={{height:'100%',width:'100%'}}>
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={<Button type="primary" onClick={handleBack}>返回主页</Button>}
      />
    </Flex>
  );
}