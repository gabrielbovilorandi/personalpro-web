import Inicio from '../Inicio';
import { alternates } from '@/lib/idioma';

// Página inicial em inglês (americano). O <html lang="en"> vem de
// scripts/idioma-html.mjs, no fim do build.
export const metadata = {
  title: 'Personal Pro · The app for personal trainers',
  description: 'Clients, workouts, scheduling, payments, and assessments in one app. Free for up to 3 clients.',
  alternates: alternates('inicio', 'en'),
  openGraph: { locale: 'en_US' },
};

export default function Page() {
  return <Inicio idioma="en" />;
}
