{\rtf1\ansi\ansicpg1252\cocoartf2759
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 import \{ useState, useEffect \} from 'react';\
import \{ Card, CardContent \} from '@/components/ui/card';\
import \{ Input \} from '@/components/ui/input';\
import \{ Button \} from '@/components/ui/button';\
import \{ Progress \} from '@/components/ui/progress';\
import \{ motion \} from 'framer-motion';\
\
export const metadata = \{\
  title: 'Salty - Salt Tracker for POTS',\
  description: 'Track your salt intake and meet your daily goals with Salty, a fun PWA for POTS patients.',\
  manifest: '/manifest.json',\
  icons: \{\
    icon: '/icons/icon-192x192.png',\
    apple: '/icons/icon-512x512.png'\
  \},\
  themeColor: '#3b82f6'\
\};\
\
export default function SaltyApp() \{\
  const [goal, setGoal] = useState(3000); // in mg\
  const [input, setInput] = useState('');\
  const [intake, setIntake] = useState(0);\
\
  useEffect(() => \{\
    if ('serviceWorker' in navigator) \{\
      navigator.serviceWorker.register('/service-worker.js');\
    \}\
  \}, []);\
\
  const handleAddIntake = () => \{\
    const amount = parseInt(input);\
    if (!isNaN(amount) && amount > 0) \{\
      setIntake(prev => prev + amount);\
      setInput('');\
    \}\
  \};\
\
  const handleSetGoal = () => \{\
    const newGoal = parseInt(input);\
    if (!isNaN(newGoal) && newGoal > 0) \{\
      setGoal(newGoal);\
      setInput('');\
    \}\
  \};\
\
  const percentage = Math.min((intake / goal) * 100, 100);\
\
  return (\
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">\
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Salty</h1>\
\
      <Card className="w-full max-w-md mb-4">\
        <CardContent className="flex flex-col gap-2">\
          <label className="font-semibold">Salt Intake Goal (mg)</label>\
          <div className="flex gap-2">\
            <Input\
              type="number"\
              value=\{input\}\
              onChange=\{e => setInput(e.target.value)\}\
              placeholder="Enter amount in mg"\
            />\
            <Button onClick=\{handleSetGoal\}>Set Goal</Button>\
          </div>\
        </CardContent>\
      </Card>\
\
      <Card className="w-full max-w-md mb-4">\
        <CardContent className="flex flex-col gap-2">\
          <label className="font-semibold">Add Salt Intake (mg)</label>\
          <div className="flex gap-2">\
            <Input\
              type="number"\
              value=\{input\}\
              onChange=\{e => setInput(e.target.value)\}\
              placeholder="Enter amount in mg"\
            />\
            <Button onClick=\{handleAddIntake\}>Add</Button>\
          </div>\
        </CardContent>\
      </Card>\
\
      <Card className="w-full max-w-md mb-4 text-center">\
        <CardContent>\
          <div className="mb-4">\
            <p className="text-lg font-semibold text-blue-800">Today's Intake: \{intake\}mg</p>\
            <p className="text-sm text-gray-600">Goal: \{goal\}mg</p>\
          </div>\
          <Progress value=\{percentage\} className="mb-4" />\
          <div className="relative w-24 h-48 mx-auto border-4 border-blue-700 rounded-t-full bg-white overflow-hidden">\
            <motion.div\
              className="absolute bottom-0 left-0 w-full bg-blue-500"\
              style=\{\{ height: `$\{percentage\}%` \}\}\
              initial=\{\{ height: 0 \}\}\
              animate=\{\{ height: `$\{percentage\}%` \}\}\
              transition=\{\{ duration: 0.5 \}\}\
            />\
          </div>\
          <p className="text-sm text-gray-500 mt-2">Salt Shaker Fill: \{Math.round(percentage)\}%</p>\
        </CardContent>\
      </Card>\
    </div>\
  );\
\}\
}