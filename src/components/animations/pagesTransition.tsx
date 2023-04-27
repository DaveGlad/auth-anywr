import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const PageTransition = () => {
  const router = useRouter();

  return (
    <motion.div
      key={router.route}
      initial="initial"
      animate="enter"
      exit="exit"
      className="transition"
    />
  );
};

const variants = {
  initial: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      delay: 1.5,
      duration: 1.5,
      stiffness: 1.5,
    },
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 1.5, // Ajout d'un délai de 0.5 secondes avant le démarrage de la transition
      duration: 1.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5, // Réduction de la durée à 0.5s pour une sortie plus rapide
    },
  },
};

type Props = {
  children: React.ReactNode;
};
const PageTransitionApparition: FC<Props> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate={'animate'} // Animation seulement après le montage du composant
      exit="exit"
      variants={variants}
      transition={{ duration: 1.5, delay: 1.5 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionApparition;
