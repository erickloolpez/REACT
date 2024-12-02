import React, { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { weekDay } from '../../constants';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

const Schedule = () => {
    const [selectedBarIndex, setSelectedBarIndex] = useState(null);

    const days = [
        { acronym: "LUN" },
        { acronym: "MAR" },
        { acronym: "MIE" },
        { acronym: "JUE" },
        { acronym: "VIE" },
        { acronym: "SAB" },
        { acronym: "DOM" },
    ];

    const [day, setDay] = useState(weekDay.monday);

    // Las etiquetas visibles
    const visibleLabels = ['6 a.m.', '9 a.m.', '12 p.m.', '3 p.m.', '6 p.m.', '9 p.m.', '12 a.m.', '3 a.m.'];

    // Recálculo de formattedData cuando cambia el estado 'day'
    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        const updatedData = day.map((bar) => ({
            ...bar,
            label: visibleLabels.includes(bar.label) ? bar.label : '', // Dejar vacío si no es visible
        }));
        setFormattedData(updatedData);
    }, [day]);

    const handleBarPress = (index) => {
        setSelectedBarIndex(index === selectedBarIndex ? null : index);
    };

    //Animación
    const [dimensions, setDimensions] = useState({ height: 20, width: 100 });
    const [currentIndex, setCurrentIndex] = useState(0);

    const translateX = useSharedValue(0);
    const tabWidth = dimensions.width / days.length;

    const handleTabPress = (index) => {
        let selectedDay;
        switch (index) {
            case 0:
                selectedDay = weekDay.monday;
                break;
            case 1:
                selectedDay = weekDay.tuesday;
                break;
            case 2:
                selectedDay = weekDay.wednesday;
                break;
            case 3:
                selectedDay = weekDay.thursday;
                break;
            case 4:
                selectedDay = weekDay.friday;
                break;
            case 5:
                selectedDay = weekDay.saturday;
                break;
            case 6:
                selectedDay = weekDay.sunday;
                break;
        }
        setDay(selectedDay);
        setCurrentIndex(index);

        translateX.value = withTiming(index * tabWidth, { duration: 300 });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    //-----FUNCTION TO RETURN THE TEXT ------
    const getBarDetails = () => {
        if (selectedBarIndex === null) {
            return 'Presiona una barra para ver los detalles';
        }

        const selectedBar = day[selectedBarIndex];
        if (selectedBar.value < 1000) {
            return `${selectedBar.label}:Por lo general, esta menos concurrido`
        } else if (selectedBar.value < 1400 && selectedBar.value >= 1000) {
            return `${selectedBar.label}:Por lo general no esta ton concurrido`
        } else if (selectedBar.value < 2000 && selectedBar.value >= 1400) {
            return `${selectedBar.label}:Por lo general, esta un poco concurrido`
        } else if (selectedBar.value < 3000 && selectedBar.value >= 2000) {
            return `${selectedBar.label}:Por lo general, es cuando esta mas concurrido`
        }

    };


    return (
        <View className="w-full justify-around">
            <View className="w-full mb-4 flex-row">
                <Text className="text-xl font-bold text-primary">Horario de mayor concurrencia</Text>
            </View>
            <View onLayout={(e) => setDimensions({ height: e.nativeEvent.layout.height, width: e.nativeEvent.layout.width })} className="w-full flex-row  relative">
                <Animated.View style={[animatedStyle, { width: dimensions.width / days.length }]} className="h-1 bg-primary absolute bottom-0" />
                {days.map((day, index) => {
                    let color = currentIndex === index ? '#fff' : '#cf613c';
                    return (
                        <Pressable
                            key={`day-${day.acronym}`}
                            className="w-[14.28%] h-10 items-center justify-center"
                            onPress={() => handleTabPress(index)}
                        >
                            <Text style={{ color: color,fontWeight:'500' }}>{day.acronym}</Text>
                        </Pressable>
                    );
                })}
            </View>

            <View style={{ alignItems: 'center', marginBottom: 30 }} className="flex-row justify-center mt-4">
                <FontAwesomeIcon icon={faUserGroup} color='white' size={22} />
                <Text style={{ color: '#fbeecc', marginLeft: 10 }}>{getBarDetails()}</Text>
            </View>

            <View className="w-full">
                <BarChart
                    data={formattedData.map((bar, index) => ({
                        ...bar,
                        frontColor: index === selectedBarIndex ? '#F29C6E' : '#006DFF',
                        gradientColor: index === selectedBarIndex ? '#FFBEA3' : '#009FFF',
                        onPress: () => handleBarPress(index),
                    }))}
                    barWidth={16}
                    initialSpacing={10}
                    spacing={3}
                    barBorderRadius={8}
                    yAxisThickness={0}
                    xAxisType={'dashed'}
                    xAxisColor={'lightgray'}
                    yAxisTextStyle={{ color: 'lightgray' }}
                    stepValue={1000}
                    maxValue={3000}
                    noOfSections={3}
                    yAxisLabelTexts={[' ', ' ', ' ', ' ']}
                    labelWidth={44}
                    xAxisLabelTextStyle={{ color: 'lightgray', textAlign: 'start' }}
                    isAnimated={true}
                    height={100}
                />
            </View>
        </View>
    );
};

export default Schedule;
