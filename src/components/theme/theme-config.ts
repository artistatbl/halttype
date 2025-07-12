export interface Theme {
  name: string
  label: string
  colors: [string, string, string]
}

export const themes: Theme[] = [
  { name: "system", label: "System", colors: ["#808080", "#D3D3D3", "#000000"] },
  { name: "light", label: "Light", colors: ["#FFFFFF", "#F0F0F0", "#000000"] },
  { name: "dark", label: "Dark", colors: ["#000000", "#1A1A1A", "#FFFFFF"] },
  { name: "amber", label: "Amber", colors: ["#FFBF00", "#FFE5B4", "#000000"] },
  { name: "caffiene", label: "Caffiene", colors: ["#6F4E37", "#C4A484", "#FFFFFF"] },
  { name: "nature", label: "Nature", colors: ["#4CAF50", "#A5D6A7", "#000000"] },
  { name: "notebook", label: "Notebook", colors: ["#F5F5F5", "#E0E0E0", "#000000"] },
  { name: "claude", label: "Claude", colors: ["#7B68EE", "#E6E6FA", "#000000"] },
  { name: "twitter", label: "Twitter", colors: ["#1DA1F2", "#E8F5FE", "#000000"] },
  { name: "mono", label: "Mono", colors: ["#000000", "#FFFFFF", "#808080"] }
]