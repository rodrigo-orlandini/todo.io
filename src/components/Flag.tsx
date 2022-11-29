import React from "react";
import { Box, Heading, useTheme } from 'native-base';
import dayjs from 'dayjs';
import ptBR from 'dayjs/locale/pt-br';

interface FlagProps { 
    date: Date;
}

const Flag = ({ date }: FlagProps) => {

    const { colors } = useTheme();

    const today = dayjs(new Date()).locale(ptBR);
    const tomorrow = dayjs(new Date()).locale(ptBR).add(1, "day");
    const expiration = dayjs(date).locale(ptBR)

    var flag: string;
    var bgColor: string;
    var textColor: string;

    if(today.get("date") === expiration.get("date")) {
        flag = "HOJE";
        bgColor = colors.orange[500];
        textColor = colors.orange[700];
    } else if(tomorrow.get("date") === expiration.get("date")) {
        flag = "AMANHÃ";
        bgColor = colors.yellow[500];
        textColor = colors.black;
    } else if(date < new Date()) {
        flag = dayjs(date).locale(ptBR).format("DD[/]MM[/]YY");
        bgColor = colors.red[500];
        textColor = colors.white;
    } else {
        flag = dayjs(date).locale(ptBR).format("DD[/]MM[/]YY");
        bgColor = colors.blue[500];
        textColor = colors.darkBlue[700];
    }

    return (
        <Box backgroundColor={bgColor} paddingX="2" paddingY="1" rounded="lg" marginLeft="3">
            <Heading fontSize="xs" color={textColor}>{flag}</Heading>
        </Box>
    );
}

export default Flag;