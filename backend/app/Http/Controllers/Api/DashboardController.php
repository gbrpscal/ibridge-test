<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function resumo()
    {
        $rows = DB::table('chamadas as ch')
            ->join('listas as l', 'l.id', '=', 'ch.lista_id')
            ->join('campanhas as c', 'c.id', '=', 'ch.campanha_id')
            ->selectRaw('
                c.nome as campanha,
                l.nome as lista,
                COUNT(*) as chamadas,
                SUM(CASE WHEN ch.situacao_id = 1 THEN 1 ELSE 0 END) as sem_contato,
                SUM(CASE WHEN ch.situacao_id = 2 THEN 1 ELSE 0 END) as contato,
                SUM(CASE WHEN ch.situacao_id = 3 THEN 1 ELSE 0 END) as abordagem,
                SUM(CASE WHEN ch.situacao_id = 4 THEN 1 ELSE 0 END) as fechamento
            ')
            ->groupBy('c.nome', 'l.nome')
            ->orderBy('c.nome')
            ->orderBy('l.nome')
            ->get();

        return response()->json($rows);
    }

    public function topOperadores()
    {
        $rows = DB::table('chamadas as ch')
            ->join('operadores as o', 'o.id', '=', 'ch.operador_id')
            ->where('ch.situacao_id', 4)
            ->selectRaw('o.id, o.nome as operador, COUNT(*) as fechamentos')
            ->groupBy('o.id', 'o.nome')
            ->orderByDesc('fechamentos')
            ->limit(10)
            ->get();

        return response()->json($rows);
    }

    public function topListas()
    {
        $rows = DB::table('chamadas as ch')
            ->join('listas as l', 'l.id', '=', 'ch.lista_id')
            ->where('ch.situacao_id', 4)
            ->selectRaw('l.id, l.nome as lista, COUNT(*) as fechamentos')
            ->groupBy('l.id', 'l.nome')
            ->orderByDesc('fechamentos')
            ->limit(10)
            ->get();

        return response()->json($rows);
    }

    public function topCampanhas()
    {
        $rows = DB::table('chamadas as ch')
            ->join('campanhas as c', 'c.id', '=', 'ch.campanha_id')
            ->where('ch.situacao_id', 4)
            ->selectRaw('c.id, c.nome as campanha, COUNT(*) as fechamentos')
            ->groupBy('c.id', 'c.nome')
            ->orderByDesc('fechamentos')
            ->limit(10)
            ->get();

        return response()->json($rows);
    }
}
