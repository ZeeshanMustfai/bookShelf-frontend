import '../styles/globals.scss'
import { NextUIProvider } from '@nextui-org/react'
import type { AppProps } from 'next/app'
import { createContext, useState } from 'react'
import { CookiesProvider } from 'react-cookie'
import { lightTheme, darkTheme } from '../theme/theme'
import { AuthContextType, ThemeContextType, Theme } from '../types'

export const MainContext = createContext<ThemeContextType | undefined>(
	undefined
)
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function App({ Component, pageProps }: AppProps) {
	const [mode, setMode] = useState<Theme>('light')

	return (
		<MainContext.Provider value={{ theme: mode, changeTheme: setMode }}>
			<CookiesProvider>
				<NextUIProvider theme={mode === 'light' ? lightTheme : darkTheme}>
					<Component {...pageProps} />
				</NextUIProvider>
			</CookiesProvider>
		</MainContext.Provider>
	)
}
