import { Box, Typography } from '@mui/material';
import CustomCard from '../cards/card';

export default function LastCheckedOutBanner() {
	return (
		<Box
			component="section"
			sx={{ backgroundColor: '#4d6aaa', p: 3, borderRadius: 2 }}
		>
			<Typography component="h2" variant="h5" color="#e9d9b4" sx={{ mb: 2 }}>
				last checked out
			</Typography>
			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 2 }}>
				{[0, 1, 2].map((card) => (
					<CustomCard key={card} title={`Card ${card + 1}`} description="Description" /> 
				))}
			</Box>
		</Box>
	);
}
