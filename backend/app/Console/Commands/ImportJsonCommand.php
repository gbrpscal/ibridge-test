<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Chamada;
use App\Models\Campanha;
use App\Models\Operador;
use App\Models\Lista;
use App\Models\Contato;
use App\Models\Situacao;
use App\Models\Categoria;

class ImportJsonCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:json';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Importa dataset JSON iBridge';

    /**
     * Executa o comando para importação do JSON
     */
    public function handle()
    {
        ini_set('memory_limit', '512M');

        $this->info('Baixando JSON...');
        $response = Http::timeout(300)->get('https://www.ibridge.com.br/dados-teste-tecnico.json');

        if (!$response->successful()) {
            $this->error('Erro ao baixar JSON. Status: ' . $response->status());
            return 1;
        }

        $this->info('Convertendo JSON...');
        $data = json_decode($response->body(), true);

        if (!is_array($data)) {
            $this->error('JSON inválido');
            return 1;
        }

        $total = count($data);
        $this->info("Total de registros: {$total}");

        $bar = $this->output->createProgressBar($total);
        $bar->start();

        $chunkSize = 500;

        foreach (array_chunk($data, $chunkSize) as $chunk) {
            DB::transaction(function () use ($chunk, $bar) {
                foreach ($chunk as $item) {

                    $campanha = Campanha::updateOrCreate(
                        ['id' => $item['campanha_id']],
                        ['nome' => $item['campanha_nome']]
                    );

                    $lista = Lista::updateOrCreate(
                        ['id' => $item['lista_id']],
                        [
                            'nome' => $item['lista_nome'],
                            'campanha_id' => $campanha->id,
                        ]
                    );

                    $operador = Operador::updateOrCreate(
                        ['id' => $item['chamada_operador_id']],
                        ['nome' => $item['chamada_operador_nome']]
                    );

                    $situacao = Situacao::updateOrCreate(
                        ['id' => $item['chamada_situacao_id']],
                        ['nome' => $item['chamada_situacao_nome']]
                    );

                    $categoria = Categoria::updateOrCreate(
                        ['id' => $item['chamada_categoria_id']],
                        ['nome' => $item['chamada_categoria_nome']]
                    );

                    $telefone = preg_replace('/\D/', '', (string) $item['chamada_telefone']);

                    $contato = Contato::updateOrCreate(
                        ['id' => $item['contato_id']],
                        [
                            'nome' => $item['contato_nome'],
                            'telefone' => $telefone,
                        ]
                    );

                    $datahora = Carbon::createFromFormat('d/m/Y H:i', $item['chamada_datahora'])
                        ->format('Y-m-d H:i:s');

                    Chamada::updateOrCreate(
                        ['id' => $item['chamada_id']],
                        [
                            'datahora' => $datahora,
                            'contato_id' => $contato->id,
                            'lista_id' => $lista->id,
                            'campanha_id' => $campanha->id,
                            'operador_id' => $operador->id,
                            'situacao_id' => $situacao->id,
                            'categoria_id' => $categoria->id,
                        ]
                    );

                    $bar->advance();
                }
            });
        }

        $bar->finish();
        $this->info("\nImportação finalizada com sucesso.");

        return 0;
    }
}
