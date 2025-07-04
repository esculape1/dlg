import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getQuotes, getClients, getProducts, getSettings } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { QuoteForm } from "./QuoteForm";
import { formatCurrency } from "@/lib/utils";

export default async function DevisPage() {
  const [quotes, clients, products, settings] = await Promise.all([
    getQuotes(),
    getClients(),
    getProducts(),
    getSettings(),
  ]);

  const statusColors = {
    Draft: 'bg-gray-500/20 text-gray-700',
    Sent: 'bg-blue-500/20 text-blue-700',
    Accepted: 'bg-green-500/20 text-green-700',
    Declined: 'bg-red-500/20 text-red-700',
  }

  const statusTranslations = {
    Draft: 'Brouillon',
    Sent: 'Envoyé',
    Accepted: 'Accepté',
    Declined: 'Refusé',
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Devis"
        actions={<QuoteForm clients={clients} products={products} settings={settings} />}
      />
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Devis</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.quoteNumber}</TableCell>
                  <TableCell>{quote.clientName}</TableCell>
                  <TableCell>{new Date(quote.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("border", statusColors[quote.status])}>
                      {statusTranslations[quote.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(quote.totalAmount, settings.currency)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
