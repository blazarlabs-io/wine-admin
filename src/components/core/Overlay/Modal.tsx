"use client";

import { Container, Text, Button, SpinnerLoader } from "@/components";
import { useModal } from "@/context/modalContext";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";

export const Modal = () => {
  const { show, title, description, action, updateModal, modalLoading } =
    useModal();
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-60 z-[999] w-screen  h-screen backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.25,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative flex flex-col items-start justify-center p-[24px] gap-[24px] bg-surface min-w-[420px] max-w-fit rounded-lg shadow-lg"
          >
            <Button
              intent="unstyled"
              onClick={() => {
                updateModal({
                  show: false,
                  title: "",
                  description: "",
                  action: { label: "", onAction: () => {} },
                });
              }}
              className="absolute top-[8px] right-[8px]"
            >
              <Icon
                icon="material-symbols:close"
                width="24"
                height="24"
                className="text-on-surface-dark"
              />
            </Button>
            <Container intent="flexRowLeft">
              <Text intent="h3">{title}</Text>
            </Container>
            <Container intent="flexRowLeft">
              <Text intent="p1">{description}</Text>
            </Container>
            <Container intent="flexRowLeft">
              <Button
                intent="primary"
                size="medium"
                fullWidth
                onClick={() => action.onAction()}
              >
                {!modalLoading ? action.label : <SpinnerLoader />}
              </Button>
            </Container>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};