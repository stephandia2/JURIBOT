'use client'

// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip' // Assuming Chip is used somewhere or removed if unused
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

// Utils Imports
import { createClient } from '@/utils/supabase/client'

const Notifications = () => {
  // States
  const [notificationSettings, setNotificationSettings] = useState({
      newForYou: { email: true, browser: true, app: true },
      accountActivity: { email: true, browser: true, app: true },
      newBrowser: { email: true, browser: true, app: false },
      newDevice: { email: false, browser: true, app: false }
  })
  const [sendNotificationWhen, setSendNotificationWhen] = useState('online')

  // Supabase (placeholder)
  const supabase = createClient()

  // Handler for checkboxes
  const handleCheckboxChange = (category: keyof typeof notificationSettings, type: 'email' | 'browser' | 'app') => {
      setNotificationSettings(prev => ({
          ...prev,
          [category]: {
              ...prev[category],
              [type]: !prev[category][type]
          }
      }))
  }

  const handleSave = async () => {
      // TODO: Save to Supabase
      console.log('Settings saved:', { notificationSettings, sendNotificationWhen })
      alert('Paramètres de notification enregistrés !')
  }

  return (
    <Card>
      <CardHeader title='Paramètres de notification' subheader='Sélectionnez les notifications que vous souhaitez recevoir' />
      <CardContent>
        <Typography className='font-medium mb-4' color='text.primary'>
            Activité récente
        </Typography>
        <TableContainer className='border rounded'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Type</TableCell>
                        <TableCell align='center'>Email</TableCell>
                        <TableCell align='center'>Navigateur</TableCell>
                        <TableCell align='center'>App</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Nouvelles pour vous</TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newForYou.email} onChange={() => handleCheckboxChange('newForYou', 'email')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newForYou.browser} onChange={() => handleCheckboxChange('newForYou', 'browser')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newForYou.app} onChange={() => handleCheckboxChange('newForYou', 'app')} /></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Activité du compte</TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.accountActivity.email} onChange={() => handleCheckboxChange('accountActivity', 'email')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.accountActivity.browser} onChange={() => handleCheckboxChange('accountActivity', 'browser')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.accountActivity.app} onChange={() => handleCheckboxChange('accountActivity', 'app')} /></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Un nouveau navigateur utilisé pour se connecter</TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newBrowser.email} onChange={() => handleCheckboxChange('newBrowser', 'email')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newBrowser.browser} onChange={() => handleCheckboxChange('newBrowser', 'browser')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newBrowser.app} onChange={() => handleCheckboxChange('newBrowser', 'app')} /></TableCell>
                    </TableRow>
                     <TableRow>
                        <TableCell>Un nouvel appareil est connecté</TableCell>
                         <TableCell align='center'><Checkbox checked={notificationSettings.newDevice.email} onChange={() => handleCheckboxChange('newDevice', 'email')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newDevice.browser} onChange={() => handleCheckboxChange('newDevice', 'browser')} /></TableCell>
                        <TableCell align='center'><Checkbox checked={notificationSettings.newDevice.app} onChange={() => handleCheckboxChange('newDevice', 'app')} /></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        <div className='mt-6'>
            <Typography className='font-medium mb-2' color='text.primary'>
                Quand devrions-nous vous envoyer des notifications ?
            </Typography>
            <FormControl fullWidth className='sm:is-[300px]'>
                <Select value={sendNotificationWhen} onChange={(e) => setSendNotificationWhen(e.target.value as string)}>
                    <MenuItem value='online'>Seulement quand je suis en ligne</MenuItem>
                    <MenuItem value='always'>Toujours</MenuItem>
                    <MenuItem value='never'>Jamais</MenuItem>
                </Select>
            </FormControl>
        </div>

        <div className='flex gap-4 mt-6'>
            <Button variant='contained' onClick={handleSave}>Enregistrer les modifications</Button>
            <Button variant='tonal' color='secondary' onClick={() => {
                 setNotificationSettings({
                    newForYou: { email: true, browser: true, app: true },
                    accountActivity: { email: true, browser: true, app: true },
                    newBrowser: { email: true, browser: true, app: false },
                    newDevice: { email: false, browser: true, app: false }
                })
                setSendNotificationWhen('online')
            }}>Réinitialiser</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Notifications
