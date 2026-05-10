<?php

declare(strict_types=1);

namespace App\Services;

use App\Models\AuthUser;
use RuntimeException;

final class GameStateService
{
    public function __construct(
        private readonly string $gameSlug,
        private readonly string $gameName
    ) {
    }

    public function initialState(): array
    {
        return [
            'game_slug' => $this->gameSlug,
            'game_name' => $this->gameName,
            'schema_version' => 1,
            'npcs' => $this->readJsonFile('npcs.json'),
            'selectedNPC' => null,
            'events' => [
                'The party gathers at the Rusty Tankard tavern.',
                'Rumors speak of trouble on the old road.',
            ],
            'location' => 'The Rusty Tankard',
            'stats' => $this->readJsonFile('stats.json'),
            'created_at' => gmdate('Y-m-d H:i:s'),
        ];
    }

    public function applyIntent(array $state, string $intent, array $payload): array
    {
        $state = $this->withDefaults($state);

        return match ($intent) {
            'select_npc' => $this->selectNpc($state, $payload),
            'add_event' => $this->addEvent($state, $payload),
            'set_location' => $this->setLocation($state, $payload),
            default => throw new RuntimeException('Unsupported game intent: ' . $intent),
        };
    }

    public function response(array $save, AuthUser $user): array
    {
        return [
            'user' => $user->toArray(),
            'save' => [
                'id' => $save['id'],
                'slot' => $save['save_slot'],
                'state' => $this->withDefaults($save['state']),
                'metadata' => $save['metadata'],
                'version' => $save['version'],
                'status' => $save['status'],
                'created_at' => $save['created_at'],
                'updated_at' => $save['updated_at'],
            ],
        ];
    }

    private function withDefaults(array $state): array
    {
        $initial = $this->initialState();
        return array_merge($initial, $state);
    }

    private function selectNpc(array $state, array $payload): array
    {
        $npcId = $payload['id'] ?? null;
        if ($npcId !== null && !is_string($npcId)) {
            throw new RuntimeException('NPC id must be a string or null.');
        }

        $validIds = array_map(
            static fn (array $npc): string => (string) $npc['id'],
            is_array($state['npcs'] ?? null) ? $state['npcs'] : []
        );
        if ($npcId !== null && !in_array($npcId, $validIds, true)) {
            throw new RuntimeException('NPC not found.');
        }

        $state['selectedNPC'] = $npcId;
        return $state;
    }

    private function addEvent(array $state, array $payload): array
    {
        $event = $payload['event'] ?? null;
        if (!is_string($event) || trim($event) === '') {
            throw new RuntimeException('Event text is required.');
        }

        $events = is_array($state['events'] ?? null) ? $state['events'] : [];
        $events[] = $event;
        $state['events'] = array_values(array_filter($events, 'is_string'));
        return $state;
    }

    private function setLocation(array $state, array $payload): array
    {
        $location = $payload['location'] ?? null;
        if (!is_string($location) || trim($location) === '') {
            throw new RuntimeException('Location is required.');
        }

        $state['location'] = $location;
        return $state;
    }

    private function readJsonFile(string $fileName): array
    {
        $path = __DIR__ . '/../../data/' . $fileName;
        if (!is_file($path)) {
            throw new RuntimeException('Missing backend data file: ' . $fileName);
        }

        $decoded = json_decode((string) file_get_contents($path), true);
        if (!is_array($decoded)) {
            throw new RuntimeException('Invalid backend data file: ' . $fileName);
        }

        return $decoded;
    }
}
