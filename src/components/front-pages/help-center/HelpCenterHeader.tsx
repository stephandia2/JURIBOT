'use client'

import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const HelpCenterHeader = ({ searchValue, setSearchValue }: { searchValue: string, setSearchValue: (v: string) => void }) => {
  return (
    <div 
      className="relative bg-no-repeat bg-cover pt-[150px] pb-[40px] px-5 text-center -mt-[20px]"
      style={{ backgroundImage: "url('/images/pages/faq-header.png')" }}
    >
      <div className="flex flex-col gap-4 items-center max-w-4xl mx-auto">
        <Typography variant='h4' color='primary' className="font-bold text-[#7367F0]">
          Bonjour, comment pouvons-nous vous aider ?
        </Typography>
        <TextField
          className='w-full sm:w-[55%] md:w-[465px] bg-white rounded-lg'
          placeholder='Poser une question...'
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { backgroundColor: 'white' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='tabler-search text-gray-500' />
              </InputAdornment>
            )
          }}
        />
        <Typography className="text-gray-600">Sujets fréquents : Sources, IA, LinkedIn, Facturation</Typography>
      </div>
    </div>
  )
}

export default HelpCenterHeader
