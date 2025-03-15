import { useState, useEffect } from "react";
import Navbar from '@/app/components/navbar';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";



// List of country names to highlight. (Make sure they match the GeoJSON data.)
const countries = [
    { name: "FRANSA", coordinates: [2.2137, 46.2276], markerOffset: -15 },
    { name: "KANADA", coordinates: [-106.3468, 56.1304], markerOffset: -15 },
    { name: "SUUDİ ARABİSTAN", coordinates: [45.0792, 23.8859], markerOffset: 15 },
    { name: "ÜRDÜN", coordinates: [36.2384, 30.5852], markerOffset: -15 },
    { name: "GÜRCİSTAN", coordinates: [43.3569, 42.3154], markerOffset: -15 },
    { name: "AZERBEYCAN", coordinates: [47.5769, 40.1431], markerOffset: 15 },
    { name: "CEZAYİR", coordinates: [1.6596, 28.0339], markerOffset: -15 },
    { name: "IRAK", coordinates: [43.7792, 33.2232], markerOffset: 15 },
    { name: "KOSOVA", coordinates: [20.9030, 42.6026], markerOffset: -15 },
    { name: "KUZEY MAKEDONYA", coordinates: [21.7453, 41.6086], markerOffset: 15 },
    { name: "LİBYA", coordinates: [17.2283, 26.3351], markerOffset: -15 }
];

const WorldMap = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            {/* Hero Section */}
            <div className="bg-gray-200 min-h-screen flex items-center justify-center pt-28">
                {/* ... existing hero section ... */}
            </div>

            {/* World Map Section */}
            <div className="py-16 bg-white overflow-hidden">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
                        Global İş Ortaklarımız
                    </h2>

                    <div className="w-full h-[400px] md:h-[500px] mb-10 overflow-hidden">

                        <ComposableMap projection="geoMercator">
                            <Geographies geography="/world-110m.json">
                                {({ geographies }) =>
                                    geographies.map(geo => (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            fill="#EAEAEC"
                                            stroke="#D6D6DA"
                                            style={{
                                                default: { outline: "none" },
                                                hover: { fill: "#F5F5F5", outline: "none" },
                                                pressed: { outline: "none" },
                                            }}
                                        />
                                    ))
                                }
                            </Geographies>
                            {countries.map(({ name, coordinates, markerOffset }) => (
                                <Marker key={name} coordinates={[coordinates[0], coordinates[1]]}>
                                    <circle r={5} fill="#3B82F6" stroke="#fff" strokeWidth={2} />
                                    <text
                                        textAnchor="middle"
                                        y={markerOffset}
                                        style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "10px" }}
                                    >
                                        {name}
                                    </text>
                                </Marker>
                            ))}
                        </ComposableMap>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 text-center">
                        {countries.map((country, index) => (
                            <div key={index} className="px-4 py-2 bg-gray-100 rounded-lg font-medium text-gray-800">
                                {country.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorldMap;