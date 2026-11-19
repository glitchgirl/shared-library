import { Card, CardContent, Typography } from '@mui/material';

type CardProps = {
  title: string;
  description: string;
};

export default function CustomCard({ title, description }: CardProps) {
  return (
    <Card sx={{ backgroundColor: '#e9d9b4', color: '#4d6aaa' }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}