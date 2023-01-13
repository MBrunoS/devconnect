import React, { useState, useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import styles from "./EditProfile.module.css";
import { PencilLine, X } from "phosphor-react";
import { UserContext } from "../context/UserContext";
import { api } from "../services/api";
import { isAxiosError } from "axios";

export function EditProfile() {
  const { user, updateUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);

  function handleClose() {
    setName(user.name);
    setRole(user.role);
    setIsOpen(false);
  }

  async function handleUpdate() {
    const response = await api.patch(`users/${user.email}`, {
      name,
      role,
    });

    if (!isAxiosError(response)) {
      setIsOpen(false);
      updateUser();
    }
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Trigger asChild>
        <button className={styles.EditButton} onClick={() => setIsOpen(true)}>
          <PencilLine size={20} />
          Edit profile
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={styles.DialogContent}>
          <Dialog.Title>Edit profile</Dialog.Title>
          <Dialog.Description className={styles.DialogDescription}>
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.Input}
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </fieldset>
          <fieldset className={styles.Fieldset}>
            <label className={styles.Label} htmlFor="role">
              Role
            </label>
            <input
              className={styles.Input}
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </fieldset>
          <Dialog.Close asChild>
            <button className={styles.SaveButton} onClick={handleUpdate}>
              Save changes
            </button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <button
              className={styles.IconButton}
              aria-label="Close"
              onClick={handleClose}
            >
              <X size={20} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
