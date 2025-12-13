// Component Imports
import AccountSettings from '@/views/pages/account-settings'
import AccountDetails from '@/views/pages/account-settings/account/AccountDetails'
import SecurityTab from '@/views/pages/account-settings/security/SecurityTab'
import BillingPlansTab from '@/views/pages/account-settings/billing-plans/BillingPlans'
import NotificationsTab from '@/views/pages/account-settings/notifications/Notifications'
import ConnectionsTab from '@/views/pages/account-settings/connections/ConnectionsTab'

const AccountSettingsPage = () => {
  const tabContentList = {
    account: <AccountDetails />,
    security: <SecurityTab />,
    'billing-plans': <BillingPlansTab />,
    notifications: <NotificationsTab />,
    connections: <ConnectionsTab />
  }

  return <AccountSettings tabContentList={tabContentList} />
}

export default AccountSettingsPage
