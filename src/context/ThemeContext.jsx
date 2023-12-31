import React,{useState,useEffect, createContext} from "react";

const getInitialTheme=()=>{
    // Check if the window object exists and supports localStorage
    if(typeof window!=='undefined' && window.localStorage){
        const storedPrefs=window.localStorage.getItem('color-theme');
        if(typeof storedPrefs==='string'){
            return storedPrefs;
        }
        // If not stored, check the user's preferred color scheme
        const userMedia=window.matchMedia('(prefers-color-scheme:dark)')
        if(userMedia.matches){
            return 'dark'
        }
    }
    return 'light'
}

export const ThemeContext=createContext();

export const ThemeProvider =({initialTheme,children})=>{
    const[theme,setTheme]=useState(getInitialTheme);

    const rawSetTheme=(theme)=>{
        const root=window.document.documentElement;

        const isDark=theme==='dark';
        root.classList.remove(isDark?'light':'dark');
        root.classList.add(theme);

        localStorage.setItem('color-theme',theme);

    };

    if(initialTheme){
        rawSetTheme(initialTheme);
    }

    useEffect(()=>{
        rawSetTheme(theme);
    },[theme]);

    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {children}
        </ThemeContext.Provider>
    )

}