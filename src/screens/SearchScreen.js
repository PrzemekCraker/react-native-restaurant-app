import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();
    console.log(results);
    const filterResultsByPrice = (price) => {
        return results.filter(results => {
            return results.price === price;
        });
    };

    return (
        <>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <ScrollView>
                <Text style={styles.result}>We have found {results.length} results</Text>
                <ResultsList results={filterResultsByPrice('$')} title="Const Effective" />
                <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
                <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    result: {
        textAlign: 'center'
    }
});

export default SearchScreen;