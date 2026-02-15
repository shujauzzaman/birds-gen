import FeaturesMenu from "../components/FeaturesMenu";
import RegionMenu from "../components/RegionMenu";
import { useState, useEffect } from "react";

function GenerateBird() {
    const [selectedRegion, setSelectedRegion] = useState<string>("");
    const [selectedFeatures, setSelectedFeatures] = useState<{ [key: string]: { name: string; image: string } }>({});

    const handleSelectedFeatures = (feature: string, value: { name: string; image: string }) => {
        setSelectedFeatures((prevFeatures) => ({
            ...prevFeatures,
            [feature]: value,
        }));
    };

    useEffect(() => {
        console.log("Selected Features:", selectedFeatures);
    }, [selectedFeatures]);

    return (
        <>
            <nav className="grid grid-cols-12 border-b border-neutral-700">
                <div className="col-span-1">
                    <img src="../public/images/logo/logo.svg" className="w-18 m-auto" alt="" />
                </div>
                <div className="col-span-10 flex flex-row items-center justify-center">Progress</div>
                <div className="col-span-1 flex flex-row items-center justify-center">Continue</div>
            </nav>
            <div className="grid grid-cols-12">
                {/* menu */}
                <div className="col-span-1 border-r border-neutral-700 p-2">
                    <RegionMenu selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
                </div>

                {/* features */}
                <div className="col-span-11 p-2">
                    <FeaturesMenu
                        selectedRegion={selectedRegion}
                        setSelectedFeatures={handleSelectedFeatures}
                    />
                </div>

                <button>Proceed</button>
            </div>
        </>
    );
}

export default GenerateBird;
