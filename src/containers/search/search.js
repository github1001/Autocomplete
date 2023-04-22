import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPlaces } from "./searchSlice";
import "../../App.css";
import { Input, AutoComplete } from "antd";

const Search = () => {
    const { predictions } = useSelector((state) => state.search);
    const dispatch = useDispatch();

    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState("");
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        setOptions(getPanelValue(value));
        if (selected) {
            setPlaces(predictions);
        }
    }, [predictions]);

    const getPanelValue = (searchText) =>
        !searchText
            ? []
            : predictions.map((place) => {
                  return {
                      value: place.description,
                  };
              });

    const onChange = (data) => {
        setValue(data);
        setSelected("");
        dispatch(getPlaces(data));
    };

    const onSelect = (data) => {
        let arrKeyword = data.split(" ");
        let keyword = arrKeyword[0];
        dispatch(getPlaces(keyword));
        setSelected(data);
    };

    const Results = () => {
        return (
            <div style={{ marginTop: 120 }}>
                {places.map((item, index) => (
                    <Input
                        key={index}
                        style={{
                            backgroundColor:
                                item.description == selected
                                    ? "#6699FF"
                                    : "#0099FF",
                            color: "white",
                            width: 500,
                        }}
                        value={item.description}
                        disabled
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <span>Places search with AutoComplete feature</span>

            <div style={{ width: "250px", padding: "20px 0" }}>
                <AutoComplete
                    value={value}
                    options={options}
                    style={{ width: 200 }}
                    onSelect={onSelect}
                    onChange={onChange}
                />
                <Results />
            </div>
        </div>
    );
};

export default Search;
