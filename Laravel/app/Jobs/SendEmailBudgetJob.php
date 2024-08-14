<?php

namespace App\Jobs;

use App\Models\Requests;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Mail\Message;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendEmailBudgetJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $details;

    /**
     * Create a new job instance.
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        foreach ($this->details as $item) {
            Mail::send('emails.allocated-budget', [
                'name' => $item['name'],
                'invoice' => $item['folio'],
                'amount' => $item['monto_aprobado'],
                'dates' => $item['dates'],
                'send_date' => $item['send_date'],
            ], function (Message $message) use ($item) {
                $message->to($item['email'])
                    ->subject('Felicidades, tu solicitud de beca deportiva ha sido aprobada');
            });
            
            Requests::where('invoice', $item['folio'])->update(['notification_received' => 1]);
        }
    }
}
