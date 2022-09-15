import { useTranslation } from 'react-i18next';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import {
  useFormik, Field, Form, FormikProvider,
} from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import FormInput from '../Inputs/FormInput.jsx';
import useSocket from '../../hooks/useSocket';
import { getRenameSchema } from '../../schemas';

const Rename = ({ hideModal, open, id }) => {
  const socket = useSocket();
  const { t } = useTranslation();

  const { entities } = useSelector((state) => state.channels);
  const channels = Object.values(entities);
  const currChannel = channels.find((ch) => ch.id === id);
  const channelNames = channels.map(({ name }) => name).filter((name) => name !== currChannel.name);

  const f = useFormik({
    initialValues: {
      name: currChannel.name,
    },
    validationSchema: getRenameSchema(channelNames),
    onSubmit: ({ name }) => {
      const info = { name, id };
      try {
        socket.renameChannel(info);
        hideModal();
        toast.success(t('toasts.rename'));
      } catch (e) {
        toast.error((t('errors.network')));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
    validateOnMount: false,
  });

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={hideModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <FormikProvider value={f}>
                  <Form>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                            {t('modals.rename')}
                          </Dialog.Title>
                          <div className="mt-2">
                            <Field
                              as={<FormInput type="text" key="modals.rename" />}
                              name="name"
                              id="name"
                            />
                            {f.errors.name && <p className="mt-2 text-sm text-red-600">{t(f.errors.name)}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="
                        mt-3 w-full
                        inline-flex
                        justify-center
                        rounded-md
                        border border-gray-300
                        bg-white
                        px-4 py-2
                        text-base
                        font-medium
                        text-gray-700
                        shadow-sm
                        hover:bg-gray-50
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                        sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => hideModal()}
                        ref={cancelButtonRef}
                      >
                        {t('buttons.cancel')}
                      </button>
                      <button
                        type="submit"
                        className="
                        inline-flex
                        w-full
                        justify-center
                        rounded-md
                        border border-transparent
                        bg-red-600
                        px-4 py-2
                        text-bas
                        font-medium
                        text-white
                        shadow-sm
                        hover:bg-red-700
                        focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                        sm:ml-3 sm:w-auto sm:text-sm"
                        disabled={f.isSubmitting}
                      >
                        {t('buttons.rename')}
                      </button>
                    </div>
                  </Form>
                </FormikProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Rename;
