'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'

// Component Imports
import CustomTabList from '@core/components/mui/TabList'

// Context Imports
import { useLanguage } from '@/contexts/LanguageContext'

// Page Imports
import AccountDetails from './account/AccountDetails'
import SecurityTab from './security/SecurityTab'
import BillingPlansTab from './billing-plans/BillingPlans'
import NotificationsTab from './notifications/Notifications'
import ConnectionsTab from './connections/ConnectionsTab'

const AccountSettings = ({ tabContentList }: { tabContentList?: { [key: string]: React.ReactNode } }) => {
  // States
  const [activeTab, setActiveTab] = useState('account')
  const { t } = useLanguage()

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  return (
    <TabContext value={activeTab}>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12 }}>
          <CustomTabList onChange={handleChange} variant='scrollable' pill='true'>
            <Tab
              label={
                <div className='flex items-center gap-2'>
                  <i className='tabler-users' />
                  {t.tabs.account}
                </div>
              }
              value='account'
            />
            <Tab
              label={
                <div className='flex items-center gap-2'>
                  <i className='tabler-lock' />
                  {t.tabs.security}
                </div>
              }
              value='security'
            />
            <Tab
              label={
                <div className='flex items-center gap-2'>
                  <i className='tabler-file-text' />
                  {t.tabs.billing}
                </div>
              }
              value='billing-plans'
            />
            <Tab
              label={
                <div className='flex items-center gap-2'>
                  <i className='tabler-bell' />
                  {t.tabs.notifications}
                </div>
              }
              value='notifications'
            />
            <Tab
              label={
                <div className='flex items-center gap-2'>
                  <i className='tabler-link' />
                  {t.tabs.connections}
                </div>
              }
              value='connections'
            />
          </CustomTabList>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TabPanel value='account' className='p-0'>
            <AccountDetails />
          </TabPanel>
          <TabPanel value='security' className='p-0'>
            <SecurityTab />
          </TabPanel>
          <TabPanel value='billing-plans' className='p-0'>
            <BillingPlansTab />
          </TabPanel>
          <TabPanel value='notifications' className='p-0'>
            <NotificationsTab />
          </TabPanel>
          <TabPanel value='connections' className='p-0'>
            <ConnectionsTab />
          </TabPanel>
        </Grid>
      </Grid>
    </TabContext>
  )
}

export default AccountSettings
