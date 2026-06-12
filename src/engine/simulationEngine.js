/**
 * Byte Tracer Simulation Engine
 * Generates I/O journey simulation data for IBM FlashSystem
 */

export const FIXED_TOPOLOGY = [
  'Host01',
  'HBA1',
  'SwitchA',
  'FS_Port_1',
  'Node1',
  'Cache',
  'RAID5_Group_2',
  'Pool_Alpha',
  'Volume_Prod01',
  'FCM_Module_7'
];

export const LATENCY_VALUES = {
  host: 0.3,
  fabric: 1.2,
  frontend: 0.4,
  cache: 0.1,
  backend: 1.8
};

export const HOP_DATA = [
  {
    component: 'Host01 → HBA1',
    title: 'Host Queueing & Dispatch',
    description: 'The host generated a write request and placed it into the HBA queue. Queue depth was healthy, so dispatch occurred without delay.',
    latency_ms: 0.3,
    operation: 'Queue Management',
    reasoning: 'Healthy queue depth enabled immediate dispatch'
  },
  {
    component: 'HBA1 → SwitchA',
    title: 'HBA Path Selection',
    description: 'The HBA selected the optimal fabric path based on ALUA and current link load. No congestion detected at this stage.',
    latency_ms: 1.2,
    operation: 'Path Selection',
    reasoning: 'ALUA routing selected optimal path based on link load'
  },
  {
    component: 'SwitchA → FS_Port_1',
    title: 'Fabric Forwarding',
    description: 'The switch forwarded the frame through Zone1. Minor latency introduced due to light fabric traffic.',
    latency_ms: 1.2,
    operation: 'Frame Forwarding',
    reasoning: 'Light fabric traffic caused minimal forwarding delay'
  },
  {
    component: 'FS_Port_1 → Node1',
    title: 'Front-End Port Processing',
    description: 'FlashSystem front-end port accepted the frame and routed it to Node1 based on ownership and load balancing.',
    latency_ms: 0.4,
    operation: 'Port Processing',
    reasoning: 'Node ownership and load balancing determined routing'
  },
  {
    component: 'Node1 → Cache',
    title: 'Cache Evaluation',
    description: 'Node1 checked for a cache hit. No matching block found, so the request proceeded as a cache miss.',
    latency_ms: 0.1,
    operation: 'Cache Lookup',
    reasoning: 'Cache miss - block not previously accessed'
  },
  {
    component: 'Cache → RAID5_Group_2',
    title: 'RAID Striping',
    description: 'Data was broken into stripes and mapped across RAID5_Group_2. Parity calculated and appended.',
    latency_ms: 1.8,
    operation: 'RAID Processing',
    reasoning: 'RAID5 parity calculation added processing time'
  },
  {
    component: 'RAID5_Group_2 → Pool_Alpha',
    title: 'Pool Allocation',
    description: 'The system selected Pool_Alpha based on volume placement and available capacity.',
    latency_ms: 0.1,
    operation: 'Pool Selection',
    reasoning: 'Volume placement policy determined pool selection'
  },
  {
    component: 'Pool_Alpha → Volume_Prod01',
    title: 'Volume Mapping',
    description: 'The write was mapped to Volume_Prod01. Extent allocation was confirmed and metadata updated.',
    latency_ms: 0.2,
    operation: 'Volume Mapping',
    reasoning: 'Extent allocation and metadata update completed'
  },
  {
    component: 'Volume_Prod01 → FCM_Module_7',
    title: 'Media Commit',
    description: 'Data was written to FCM_Module_7. Compression applied successfully. Write acknowledged back up the stack.',
    latency_ms: 1.8,
    operation: 'Media Write',
    reasoning: 'Compression and physical write to flash media'
  }
];

export const AI_INSIGHTS = [
  'Path chosen due to optimal ALUA routing and balanced node load.',
  'Latency primarily introduced at the fabric and backend RAID layers.',
  'Cache miss occurred because the block was not previously accessed.',
  'RAID5 parity calculation added backend latency.',
  'To reduce latency: enable caching hints, rebalance workloads, or increase backend parallelism.'
];

/**
 * Generate complete simulation output
 */
export function generateSimulation() {
  const totalLatency = HOP_DATA.reduce((sum, hop) => sum + hop.latency_ms, 0);
  
  const latencyBreakdown = {
    host: LATENCY_VALUES.host,
    fabric: LATENCY_VALUES.fabric,
    frontend: LATENCY_VALUES.frontend,
    cache: LATENCY_VALUES.cache,
    backend: LATENCY_VALUES.backend,
    total: totalLatency
  };

  const finalNarrative = generateNarrative();

  return {
    topology: FIXED_TOPOLOGY,
    latency_breakdown: latencyBreakdown,
    hops: HOP_DATA,
    ai_summary: AI_INSIGHTS.join(' '),
    ai_insights: AI_INSIGHTS,
    final_narrative: finalNarrative,
    total_latency_ms: totalLatency
  };
}

/**
 * Generate human-readable narrative of the byte's journey
 */
function generateNarrative() {
  const narrative = `
The I/O write request begins its journey at Host01, where it is queued and dispatched through HBA1 with minimal delay due to healthy queue depth (0.3ms). 

The HBA intelligently selects the optimal fabric path using ALUA routing, considering current link loads, and forwards the request to SwitchA (1.2ms). The switch processes the frame through Zone1, experiencing only minor latency from light fabric traffic (1.2ms).

Upon reaching the FlashSystem at FS_Port_1, the front-end port accepts the frame and routes it to Node1 based on ownership and load balancing policies (0.4ms). Node1 performs a cache lookup, but encounters a cache miss as this block hasn't been previously accessed (0.1ms).

The request then enters the backend storage layer where data is broken into stripes and mapped across RAID5_Group_2. Parity is calculated and appended, introducing the first significant latency spike (1.8ms). The system selects Pool_Alpha based on volume placement and available capacity (0.1ms).

The write is mapped to Volume_Prod01 with extent allocation confirmed and metadata updated (0.2ms). Finally, the data reaches FCM_Module_7 where compression is applied and the physical write to flash media occurs, introducing another latency spike (1.8ms). The write is acknowledged and the response travels back up the stack.

Total journey time: ${HOP_DATA.reduce((sum, hop) => sum + hop.latency_ms, 0).toFixed(1)}ms
  `.trim();

  return narrative;
}

/**
 * Get simulation as JSON (for export/API)
 */
export function getSimulationJSON() {
  return JSON.stringify(generateSimulation(), null, 2);
}

// Made with Bob
