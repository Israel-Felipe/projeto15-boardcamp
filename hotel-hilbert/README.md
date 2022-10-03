O Hotel de Hilbert não está indo muito bem. Mesmo suportando infinitos hóspedes, quase ninguém está se hospedando lá...

O hotel está tentando se modernizar para melhorar sua administração e entender como atrair mais pessoas. Para isso, criaram um banco com as seguntes tabelas:

- `rooms`: quartos do hotel
    - `id`, inteiro gerado automaticamente pelo banco de dados
    - `name`, string que representa o nome do quarto
- `guests`: pessoas que já se hospedaram/estão hospedadas
    - `id`, inteiro gerado automaticamente pelo banco de dados
    - `name`, string que representa o nome do hóspede
- `allocations`: histórico de hospedagem que liga um quarto a um cliente num determinado período de tempo
    - `id`, inteiro gerado automaticamente pelo banco de dados
    - `roomId`, inteiro com id do quarto usado
    - `guestId`, inteiro com id do hóspede
    - `startDate`, data com início da hospedagem
    - `endDate`, data com final da hospedagem

Agora precisam obter os dados de hospedagem. Implemente a rota **GET** `/allocations` trazendo o histórico de hospedagens, trazendo junto as informações do cliente e do quarto.