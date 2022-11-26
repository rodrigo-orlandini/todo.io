import { Spinner, Center } from 'native-base';

const Loading = () => {
    return (
        <Center flex={1}>
            <Spinner color="darkBlue.700" />
        </Center>
    );
}

export default Loading