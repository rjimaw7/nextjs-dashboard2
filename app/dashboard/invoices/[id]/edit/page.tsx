import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface Props{
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Edit Invoice',
};


const EditInvoice = async ({params} : Props) => {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
    <Breadcrumbs
      breadcrumbs={[
        { label: 'Invoices', href: '/dashboard/invoices' },
        {
          label: 'Edit Invoice',
          href: `/dashboard/invoices/${id}/edit`,
          active: true,
        },
      ]}
    />
    <Form invoice={invoice} customers={customers} />
  </main>
  )
}

export default EditInvoice